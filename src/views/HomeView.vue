<script setup>
import { onMounted, ref,defineProps,computed } from 'vue'
import axios from "axios";
import emptyIcon from '@/components/icons/empty.vue'
import plusIcon from '@/components/icons/plus.vue' 
import arrowUpIcon from '@/components/icons/arrowUp.vue'
import commentsIcon from '@/components/icons/comments.vue'

let feedbacks = ref([])

const props = defineProps(['categoryFilter','topbarFilter']);

onMounted( async () => {
  getAllFeedback()
})
 
const getAllFeedback = async () => {
  if(localStorage.getItem('feedbacks')){
    feedbacks.value = JSON.parse(localStorage.getItem('feedbacks'))
  } else {
    let response = await axios.get('../../data.json')
    feedbacks.value = response.data.productRequests
    localStorage.setItem('feedbacks',JSON.stringify(feedbacks.value))
  }
}

const userVoteing = function (feedbackIndex) {
  if (!feedbacks.value[feedbackIndex].isVoted) {
    feedbacks.value[feedbackIndex].isVoted = true
    feedbacks.value[feedbackIndex].upvotes++

    // Retrieve existing data from local storage
    const storedData = JSON.parse(localStorage.getItem('feedbacks')) || [];

    // Update the specific feedback item in the local storage data
    storedData[feedbackIndex] = feedbacks.value[feedbackIndex];

    // Save the modified data back to local storage
    localStorage.setItem('feedbacks', JSON.stringify(storedData));
  }

  // console.log(!feedbacks.value[feedbackIndex].isVoted);
}

const filteredFeedbacks = computed(() => {
  let filteredData = [...feedbacks.value];

  if (props.categoryFilter !== 'all') {
      filteredData = filteredData.filter(feedback => feedback.category === props.categoryFilter);
  }

  if (props.topbarFilter === 'Most upvotes') {
      filteredData = filteredData.slice().sort((a, b) => b.upvotes - a.upvotes);
    } else if (props.topbarFilter === 'Least upvotes') {
      filteredData = filteredData.slice().sort((a, b) => a.upvotes - b.upvotes);
    } else if (props.topbarFilter === 'Most comments') {
      filteredData = filteredData.slice().sort((a, b) => (b.comments ? b.comments.length : 0) - (a.comments ? a.comments.length : 0));
    } else if (props.topbarFilter === 'Least comments') {
      filteredData = filteredData.slice().sort((a, b) => (a.comments ? a.comments.length : 0) - (b.comments ? b.comments.length : 0));
    }

  return filteredData;
});

</script>

<template>

  <!-- <div class="notifications-box">
    <p>notification message goes here</p>
    <span>X</span>
  </div> -->
  
  <div class="home-content">

    <div class="content-box">
      
      <div class="suggestion-holder" v-if="filteredFeedbacks" >

        <div class="suggestion" :class="{voted: feedback.isVoted}" v-for="(feedback, index) in filteredFeedbacks" :key="index">

          <div class="left-side">

            <div class="vote-count-box"  @click="userVoteing(index)">
              <arrowUpIcon :isVoted="feedback.isVoted" />
              <span class="votes">{{ feedback.upvotes }}</span>
            </div>

            <router-link :to="'/feedback-details/' + feedback.id">
              <div class="feedback-box">
                <h3 class="feedback-header">{{ feedback.title }}</h3>
                <p class="feedback-body">{{ feedback.description }}</p>
                <div class="tags">
                  <span class="tag">{{ feedback.category }}</span>
                </div>
              </div>
            </router-link>

          </div>

          <div class="right-side comments">
            <commentsIcon />
            <span class="comment-count">{{ feedback.comments ? feedback.comments.length : 0 }}</span>
          </div>
          
        </div>

      </div>

      <div class="no-feedback" v-else>
        <emptyIcon />
        <h1>There is no feedback yet.</h1>
        <p>
          Got a suggestion? Found a bug that needs to be squashed?<br>
          We love hearing about new ideas to improve our app.
        </p>
        <router-link to="/new-feedback"><button class="primary"><plusIcon /> Add Feedback</button></router-link>
      </div>

    </div>
  </div>
</template>

<style scoped>
.notifications-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 0;
  top: 80px;
  min-width: 350px;
  height: 50px;
  padding: 0 15px;
  background-color: var(--dark-blue);
  opacity: .7;
}
.content-box{
  margin-top: 20px;
}
.suggestion-holder .suggestion{
  padding: 10px;
  border-radius: 10px;
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 150px;
  margin-bottom: 20px;
}
.suggestion-holder .suggestion:hover{
  cursor: pointer;
}
.suggestion-holder .suggestion .left-side{
  display: flex;
  margin-left: 20px;
  width: 100%;
}
.suggestion-holder .suggestion .left-side a{
  color: unset;
  text-decoration: unset;
}
.suggestion-holder .suggestion .left-side .vote-count-box{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 53px;
  border-radius: 10px;
  background-color: var(--dark-gray);
}
.suggestion-holder .suggestion.voted .left-side .vote-count-box{
  color: var(--white);
  background-color: var(--dark-blue);
}
.suggestion-holder .suggestion .left-side .vote-count-box:hover{
  background-color: #CFD7FF;
  cursor: pointer;
}
.suggestion-holder .suggestion.voted .left-side .vote-count-box{
  background-color: var(--dark-blue) ;
}
.suggestion-holder .suggestion .left-side .vote-count-box .votes{
  margin-top: 8px;
  font-weight: bold;
}
.suggestion-holder .suggestion .left-side .feedback-box{
  margin: 0 20px 0 50px;
}
.suggestion-holder .suggestion .left-side .feedback-box:hover .feedback-header{
  color: var(--dark-blue);
  width: 100%;
}
.suggestion-holder .suggestion .left-side .feedback-box .feedback-body{
  margin: 8px 0 20px 0;
}
.suggestion-holder .suggestion .left-side .feedback-box .tags .tag{
  min-width: 48px;
  text-align: center;
  background-color: var(--dark-gray);
  color: var(--dark-blue);
  font-weight: bold;
  font-size: 13px;
  border-radius: 10px;
  padding: 5px 15px;
  margin: 5px;
  margin-left: unset;
}
.suggestion-holder .suggestion .right-side{
  margin-right: 20px;
}
.suggestion-holder .suggestion .right-side.comments{
  display: flex;
  align-items: center;
}
.suggestion-holder .suggestion .right-side .comment-count{
  margin-left: 15px;
  font-weight: bold;
}

</style>