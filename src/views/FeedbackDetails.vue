<script setup>
  import { onMounted,ref } from 'vue';
  import leftArrowIcon from '@/components/icons/arrowLeft.vue'
  import arrowUpIcon from '@/components/icons/arrowUp.vue'
  import commentsIcon from '@/components/icons/comments.vue'

  const feedback = ref({})
  const feedbacks = ref({})

  let title = ref({})
  let isVoted = false
  let upvotes = 0
  let description = ''
  let category = ''
  let comments = []

  let showReplyBox = false

  const props = defineProps({
    id: {
      type: String,
      default: ''
    }
  })

  onMounted(async () => {
      getFeedback()
      title.value = feedback.value[0].title
      isVoted = feedback.value[0].isVoted
      upvotes = feedback.value[0].upvotes
      description = feedback.value[0].description
      category = feedback.value[0].category
      comments = feedback.value[0].comments
      // console.log(feedback.value[0].comments[1].replies);
  })

  const getFeedback = async () => {
    let data = JSON.parse(localStorage.getItem('feedbacks'))
    feedbacks.value = data
    feedback.value = data.filter((item) => item.id == props.id)
  } 

  const userVoteing = function (feedback) {
    if (!feedbacks.value[feedback].isVoted) {
      feedbacks.value[feedback].isVoted = true
      feedbacks.value[feedback].upvotes++

      // Retrieve existing data from local storage
      const storedData = JSON.parse(localStorage.getItem('feedbacks')) || [];

      // Update the specific feedback item in the local storage data
      storedData[feedback] = feedbacks.value[feedback];

      // Save the modified data back to local storage
      localStorage.setItem('feedbacks', JSON.stringify(storedData));
    }
  }

  const replyOn = (userToReplyOn) => {
    showReplyBox = true
  }
</script>

<template>
  <div class="feedback-details" >
    <nav class="feedback-details-navbar">
      <div>
        <leftArrowIcon />
        <router-link to="/"><button class="go-back">Go Back</button></router-link>
      </div>

      <router-link to="/edit-feedback"><button class="dark-blue">Edit Feedback</button></router-link>
    </nav>


    <div class="details-content">
      
      <div class="feedback-details">

        <div class="suggestion" :class="{voted: isVoted}">

          <div class="left-side">

            <div class="vote-count-box"  @click="userVoteing(feedback)">
              <arrowUpIcon :isVoted="isVoted" />
              <span class="votes">{{ upvotes }}</span>
            </div>

            <div class="feedback-box">
              <h3 class="feedback-header">{{ title }}</h3>
              <p class="feedback-body">{{ description }}</p>
              <div class="tags">
                <span class="tag">{{ category }}</span>
              </div>
            </div>
            

          </div>

          <div class="right-side comments">
            <commentsIcon />
            <span class="comment-count">{{ comments ? comments.length : 0 }}</span>
          </div>

        </div>

      </div>

      <div class="feedback-comments">
        <div>
          <h3><span class="comment-count">{{ comments ? comments.length : 0 }}</span> Comments</h3>
        </div>

        <div class="comments-wrapper" >

          <div class="comment" v-for="(comment, index) in comments" :key="index">

            <hr>

            <div class="comment-header">
              <div>

                <div class="user-image">
                  <img :src="comment.user.image" alt="">
                </div>

                <div class="user-details">
                  <h4 class="name">{{ comment.user.name }}</h4>
                  <h4 class="user">@{{ comment.user.username }}</h4>
                </div>

              </div>
              

              <span class="reply-btn" @click="replyOn(comment.user.username)">reply</span>

            </div>

            <div class="comment-body">

              <p>{{ comment.content }}</p>

              <div class="post-reply" v-show="showReplyBox">
                <input type="text" class="post-reply-input" placeholder="Type your comment here">
                <button class="primary">Post Reply</button>
              </div>

              <!-- Comment reply -->
              
              <div class="comment-replies" v-if="comment.replies">

                <!-- <div class="line"></div> -->

                <div class="comment-reply">

                  <div class="reply" v-for="(reply, index) in comment.replies" :key="index">


                    <div class="reply-header">
                      <div>
                        
                        <div class="user-image">
                          <img :src="reply.user.image" alt="">
                        </div>

                        <div class="user-details">
                          <h4 class="name">{{ reply.user.name }}</h4>
                          <h4 class="user">@{{ reply.user.username }}</h4>
                        </div>

                      </div>

                      <span class="reply-btn" @click="replyOn(reply.user.username)">reply</span>
                      
                    </div>

                    <div class="reply-body">

                      <p><span class="replying-to">@{{ reply.replyingTo }} </span>{{ reply.content }}</p>

                      <div class="comment-reply" v-show="showReplyBox">
                        <input type="text" class="comment-reply-input" placeholder="Type your comment here">
                        <button class="primary">Post Reply</button>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div class="current-user-comment">

        <h3>Add Comment</h3>

        <div class="user-comment-box">
          <input type="text" class="current-user-input" placeholder="Type your comment here">
        </div>
        
        <div class="user-comment-footer">
          <p>250 Characters left</p>
          
          <button class="primary">Post Comment</button>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.feedback-details{
  margin: 0 auto;
  width: 730px;
}
.feedback-details-navbar{
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.feedback-details-navbar > div a{margin-left: -45px;}
.details-content{
  margin-top: 20px;
}
 .suggestion{
  padding: 10px;
  border-radius: 10px;
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 150px;
  margin-bottom: 20px;
}
 .suggestion .left-side{
  display: flex;
  margin-left: 20px;
  width: 100%;
}
 .suggestion .left-side a{
  color: unset;
  text-decoration: unset;
}
 .suggestion .left-side .vote-count-box{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 53px;
  border-radius: 10px;
  background-color: var(--dark-gray);
}
 .suggestion.voted .left-side .vote-count-box{
  color: var(--white);
  background-color: var(--dark-blue);
}
 .suggestion .left-side .vote-count-box:hover{
  background-color: #CFD7FF;
  cursor: pointer;
}
 .suggestion.voted .left-side .vote-count-box{
  background-color: var(--dark-blue) ;

}
 .suggestion .left-side .vote-count-box .votes{
  margin-top: 8px;
  font-weight: bold;
}
 .suggestion .left-side .feedback-box{
  margin: 0 20px 0 50px;
}
 .suggestion .left-side .feedback-box .feedback-body{
  margin: 8px 0 20px 0;
}
 .suggestion .left-side .feedback-box .tags .tag{
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
 .suggestion .right-side{
  margin-right: 20px;
}
 .suggestion .right-side.comments{
  display: flex;
  align-items: center;
}
 .suggestion .right-side .comment-count{
  margin-left: 15px;
  font-weight: bold;
}
.feedback-comments{
  padding: 10px;
  border-radius: 10px;
  background-color: var(--white);
}
.feedback-comments h3{
  margin: 20px 0 20px 20px;
  color: var(--deep-dark-gray);
}
.feedback-comments .comments-wrapper .comment{margin: 20px 0 40px 0;}
.feedback-comments .comments-wrapper .comment hr{
  display: none;
  opacity: 25%;
  margin: 0 20px 20px 20px;
}
.feedback-comments .comments-wrapper .comment:not(:first-child) hr{display: block;}
.feedback-comments .comments-wrapper .comment .comment-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.feedback-comments .comments-wrapper .comment .comment-header .reply-btn{
  margin-right: 20px;
  color: var(--dark-blue);
  font-weight:600;
  font-size: 13px;
}
.feedback-comments .comments-wrapper .comment .comment-header .reply-btn:hover{text-decoration: underline;cursor: pointer;}
.feedback-comments .comments-wrapper .comment .comment-header > div{display: flex;}
.feedback-comments .comments-wrapper .comment .comment-header .user-image{margin-left: 20px;}
.feedback-comments .comments-wrapper .comment .comment-header .user-image img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.feedback-comments .comments-wrapper .comment .comment-header .user-details{margin-left: 20px;}
.feedback-comments .comments-wrapper .comment .comment-header .user-details .name{color: var(--deep-dark-gray);}
.feedback-comments .comments-wrapper .comment .comment-header .user-details .user{font-weight: normal;color: var(--deep-gray);}
.feedback-comments .comments-wrapper .comment .comment-body{margin: 20px 0 20px 80px;position: relative;}
.feedback-comments .comments-wrapper .comment .comment-body p{
  color: var(--deep-gray);
  margin-bottom: 20px;
}
.feedback-comments .comments-wrapper .comment .reply-body .comment-reply,
.feedback-comments .comments-wrapper .comment .comment-body .post-reply{
  display: flex;
  margin-bottom: 20px;
}
.feedback-comments .comments-wrapper .comment .reply-body .comment-reply input,
.feedback-comments .comments-wrapper .comment .comment-body .post-reply input{
  width: 100%;
  border: none;
  border-radius: 10px;
  margin-right: 20px;
  height: 80px;
  padding-left: 20px;
  /* padding-top: 20px; */
}
/* ================================================================================ */
/* ================================================================================ */
/* ================================ reply Style ================================== */
/* ================================================================================ */
/* ================================================================================ */
.comment-replies{
  padding: 10px;
  background-color: var(--white);
}
.comment-replies .line{
  /* position: relative;
  left: 0; */
  border-color: red;
  /* transform: rotate(90deg); */
  /* opacity: 25%; */
  /* margin: 0 20px 20px 20px; */
}
.comment-replies h3{
  margin: 20px 0 20px 20px;
  color: var(--deep-dark-gray);
}
.comment-replies .comment{margin: 20px 0 40px 0;}
.comment-body .comment-replies .comment-reply .reply-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment-body .comment-replies .comment-reply .reply-header .reply-btn{
  margin-right: 20px;
  color: var(--dark-blue);
  font-weight:600;
  font-size: 13px;
}
.comment-body .comment-replies .comment-reply .reply-header .reply-btn:hover{text-decoration: underline;cursor: pointer;}
.comment-body .comment-replies .comment-reply .reply-header > div{display: flex;}
.comment-body .comment-replies .comment-reply .reply-header .user-image{margin-left: 20px;}
.comment-body .comment-replies .comment-reply .reply-header .user-image img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.comment-body .comment-replies .comment-reply .reply-header .user-details{margin-left: 20px;}
.comment-body .comment-replies .comment-reply .reply-header .user-details .name{color: var(--deep-dark-gray);}
.comment-body .comment-replies .comment-reply .reply-header .user-details .user{font-weight: normal;color: var(--deep-gray);}

.comment-body .comment-replies .comment-reply .reply-body{margin: 20px 0 20px 80px;}
.comment-body .comment-replies .comment-reply .reply-body .replying-to{color: var(--primary); margin-right: 10px; font-weight: bold;}
.comment-body .comment-replies .comment-reply .reply-body p{
  color: var(--deep-gray);
  margin-bottom: 20px;
}

/* ================================================================================ */
/* ================================================================================ */
/* ========================= Current User Comment Style =========================== */
/* ================================================================================ */
/* ================================================================================ */
.current-user-comment{
  margin-bottom: 50px;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--white);
}
.current-user-comment h3{
  color: var(--deep-dark-gray);
  margin-bottom: 20px;

}
.current-user-comment .user-comment-box input{
  width: 100%;
  height: 80px;
  border: none;
  border-radius: 10px;
  padding: 0 15px 15px 15px;
}
.current-user-comment .user-comment-box input::placeholder{
  color: #8C92B3;
}
.current-user-comment .user-comment-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.current-user-comment .user-comment-footer p{
  color: var(--deep-gray);
}
.current-user-comment .user-comment-footer button{}
</style>
