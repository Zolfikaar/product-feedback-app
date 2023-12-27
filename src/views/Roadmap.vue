<script setup>
import leftArrowIcon from '@/components/icons/arrowLeft.vue'
import plusIcon from '@/components/icons/plus.vue'
import arrowUpIcon from '@/components/icons/arrowUp.vue'
import commentsIcon from '@/components/icons/comments.vue'
import emptyIcon from '@/components/icons/empty.vue'

import axios from "axios";

import { onMounted, ref } from 'vue';

const feedbacks = ref({})
const planned = ref({})
const inProgress = ref({})
const live = ref({})
const isVoted = ref(false);
let showTabs = ref(false)

onMounted(async () => {
  if (localStorage.getItem('feedbacks')) {
    let data = (feedbacks.value = JSON.parse(localStorage.getItem('feedbacks')));
    plannedData(data);
    inProgressData(data);
    Live(data);
  } else {
    let response = await axios.get('../../data.json');
    feedbacks.value = response.data.productRequests;
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks.value));
  }

  if(window.innerWidth < 768){
    showTabs.value = true
  }
});

const plannedData = (data) => {
  planned.value = data.filter((ele) => ele.status === 'planned');
};

const inProgressData = (data) => {
  inProgress.value = data.filter((ele) => ele.status === 'in-progress');
};

const Live = (data) => {
  live.value = data.filter((ele) => ele.status === 'live');
};

const userVoting = (item) => {
  
  // Retrieve existing data from local storage
  const storedData = JSON.parse(localStorage.getItem('feedbacks')) || [];

  // Find the index of the item in the stored data
  const index = storedData.findIndex((storedItem) => storedItem.id === item.id);

  if (index !== -1 && !storedData[index].isVoted) {
    // Update the local data
    storedData[index].isVoted = true;
    storedData[index].upvotes++;

    // Save the modified data back to local storage
    localStorage.setItem('feedbacks', JSON.stringify(storedData));
    
  }
};
let activeTab = ref('planned')

const toggleTab = (tab) => {
  if(tab === 'live'){
    activeTab.value = 'live'
  } else if (tab === 'planned') {
    activeTab.value = 'planned'
  } else {
    activeTab.value = 'in-progress'
  }
}
</script>

<template>
  <div class="roadmap">

    <nav class="roadmap-navbar">
      <div>
        <leftArrowIcon />
        <router-link to="/"><button class="go-back">Go Back</button></router-link>
        <h1>Roadmap</h1>
      </div>

      <router-link to="/new-feedback"><button class="primary"><plusIcon />Add Feedback</button></router-link>
    </nav>

    <div class="roadmap-content">

      <div class="roadmap-lists" v-if="feedbacks">



        <div class="roadmap-lists-tabs" v-if="showTabs">

          <div class="tabs">

            <div class="tab planned" :class="{active: activeTab == 'planned'}" @click="toggleTab('planned')">
              <h4 class="tab-header">Planned <span>({{ planned.length }})</span></h4>
            </div>
            <div class="tab in-progress" :class="{active: activeTab == 'in-progress'}" @click="toggleTab('in-progress')">
              <h4 class="tab-header">In-progress <span>({{ inProgress.length }})</span></h4>
            </div>
            <div class="tab live" :class="{active: activeTab == 'live'}" @click="toggleTab('live')">
              <h4 class="tab-header">Live <span>({{ live.length }})</span></h4>
            </div>

          </div>

          <div class="lists">

            <div class="list" :class="{'planned' : activeTab}" v-if="activeTab == 'planned'">

              <div class="list-header">
                <h3>Planned <span>({{ planned.length }})</span></h3>
                <p>Ideas prioritized for research</p>
              </div>

              <div class="list-items">

                <div class="item" :class="{voted: item.isVoted}"  v-for="item in planned">

                  <div class="item-header">
                    <span></span>
                    <p>{{ item.status }}</p>
                  </div>

                  <div class="item-body">
                    <router-link :to="'/feedback-details/' + item.id">
                      <div class="feedback-box">
                        <h3 class="feedback-header">{{ item.title }}</h3>
                        <p class="feedback-body">{{ item.description }}</p>
                        <div class="tags">
                          <span class="tag">{{ item.category }}</span>
                        </div>
                      </div>
                    </router-link>
                  </div>

                  <div class="item-footer">
                    <div class="vote-count-box" @click="userVoting(item)">
                      <arrowUpIcon :isVoted="item.isVoted" />
                      <span class="votes">{{ item.upvotes }}</span>
                    </div>

                    <div class="comments-count">
                      <commentsIcon />
                      <span class="comment-count">{{ item.comments ? item.comments.length : 0 }}</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            <div class="list" :class="{'in-progress' : activeTab}" v-else-if="activeTab == 'in-progress'">

            <div class="list-header">
              <h3>In-progress <span>({{ inProgress.length }})</span></h3>
              <p>Ideas prioritized for research</p>
            </div>

            <div class="list-items">

              <div class="item" :class="{voted: item.isVoted}"  v-for="item in inProgress">

              <div class="item-header">
                <span></span>
                <p>{{ item.status }}</p>
              </div>

              <div class="item-body">
                <router-link :to="'/feedback-details/' + item.id">
                  <div class="feedback-box">
                    <h3 class="feedback-header">{{ item.title }}</h3>
                    <p class="feedback-body">{{ item.description }}</p>
                    <div class="tags">
                      <span class="tag">{{ item.category }}</span>
                    </div>
                  </div>
                </router-link>
              </div>

              <div class="item-footer">
                <div class="vote-count-box" @click="userVoting(item)">
                  <arrowUpIcon :isVoted="item.isVoted" />
                  <span class="votes">{{ item.upvotes }}</span>
                </div>

                <div class="comments-count">
                  <commentsIcon />
                  <span class="comment-count">{{ item.comments ? item.comments.length : 0 }}</span>
                </div>
              </div>

              </div>

            </div>

            </div>

            <div class="list" :class="{'live' : activeTab}"  v-else>

            <div class="list-header">
              <h3>Live <span>({{ live.length }})</span></h3>
              <p>Ideas prioritized for research</p>
            </div>

            <div class="list-items">

              <div class="item" :class="{voted: item.isVoted}" v-for="item in live">

                <div class="item-header">
                  <span></span>
                  <p>{{ item.status }}</p>
                </div>

                <div class="item-body">
                  <router-link :to="'/feedback-details/' + item.id">
                    <div class="feedback-box">
                      <h3 class="feedback-header">{{ item.title }}</h3>
                      <p class="feedback-body">{{ item.description }}</p>
                      <div class="tags">
                        <span class="tag">{{ item.category }}</span>
                      </div>
                    </div>
                  </router-link>
                </div>

                <div class="item-footer">
                  <div class="vote-count-box" @click="userVoting(item)">
                    <arrowUpIcon :isVoted="item.isVoted" />
                    <span class="votes">{{ item.upvotes }}</span>
                  </div>

                  <div class="comments-count">
                    <commentsIcon />
                    <span class="comment-count">{{ item.comments ? item.comments.length : 0 }}</span>
                  </div>
                </div>

              </div>

            </div>

            </div>

          </div>

        </div>



        <div class="roadmap-lists-normal" v-else>
          <div class="list">

            <div class="list-header">
              <h3>Planned <span>({{ planned.length }})</span></h3>
              <p>Ideas prioritized for research</p>
            </div>

            <div class="list-items">

              <div class="item" :class="{voted: item.isVoted}"  v-for="item in planned">

                <div class="item-header">
                  <span></span>
                  <p>{{ item.status }}</p>
                </div>

                <div class="item-body">
                  <router-link :to="'/feedback-details/' + item.id">
                    <div class="feedback-box">
                      <h3 class="feedback-header">{{ item.title }}</h3>
                      <p class="feedback-body">{{ item.description }}</p>
                      <div class="tags">
                        <span class="tag">{{ item.category }}</span>
                      </div>
                    </div>
                  </router-link>
                </div>

                <div class="item-footer">
                  <div class="vote-count-box" @click="userVoting(item)">
                    <arrowUpIcon :isVoted="item.isVoted" />
                    <span class="votes">{{ item.upvotes }}</span>
                  </div>

                  <div class="comments-count">
                    <commentsIcon />
                    <span class="comment-count">{{ item.comments ? item.comments.length : 0 }}</span>
                  </div>
                </div>

              </div>

            </div>

            </div>

            <div class="list">

            <div class="list-header">
              <h3>In-progress <span>({{ inProgress.length }})</span></h3>
              <p>Ideas prioritized for research</p>
            </div>

            <div class="list-items">

              <div class="item" :class="{voted: item.isVoted}"  v-for="item in inProgress">

              <div class="item-header">
                <span></span>
                <p>{{ item.status }}</p>
              </div>

              <div class="item-body">
                <router-link :to="'/feedback-details/' + item.id">
                  <div class="feedback-box">
                    <h3 class="feedback-header">{{ item.title }}</h3>
                    <p class="feedback-body">{{ item.description }}</p>
                    <div class="tags">
                      <span class="tag">{{ item.category }}</span>
                    </div>
                  </div>
                </router-link>
              </div>

              <div class="item-footer">
                <div class="vote-count-box" @click="userVoting(item)">
                  <arrowUpIcon :isVoted="item.isVoted" />
                  <span class="votes">{{ item.upvotes }}</span>
                </div>

                <div class="comments-count">
                  <commentsIcon />
                  <span class="comment-count">{{ item.comments ? item.comments.length : 0 }}</span>
                </div>
              </div>

              </div>

            </div>

            </div>

            <div class="list">

            <div class="list-header">
              <h3>Live <span>({{ live.length }})</span></h3>
              <p>Ideas prioritized for research</p>
            </div>

            <div class="list-items">

              <div class="item" :class="{voted: item.isVoted}" v-for="item in live">

              <div class="item-header">
                <span></span>
                <p>{{ item.status }}</p>
              </div>

              <div class="item-body">
                <router-link :to="'/feedback-details/' + item.id">
                  <div class="feedback-box">
                    <h3 class="feedback-header">{{ item.title }}</h3>
                    <p class="feedback-body">{{ item.description }}</p>
                    <div class="tags">
                      <span class="tag">{{ item.category }}</span>
                    </div>
                  </div>
                </router-link>
              </div>

              <div class="item-footer">
                <div class="vote-count-box" @click="userVoting(item)">
                  <arrowUpIcon :isVoted="item.isVoted" />
                  <span class="votes">{{ item.upvotes }}</span>
                </div>

                <div class="comments-count">
                  <commentsIcon />
                  <span class="comment-count">{{ item.comments ? item.comments.length : 0 }}</span>
                </div>
              </div>

              </div>

            </div>

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
.roadmap{
  margin: 0 auto;
  width: 1110px;
}
.roadmap-navbar{
  padding: 0 20px;
  border-radius: 10px;
  background-color: var(--navbar);
  color: var(--white);
  height: 113px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.roadmap-navbar > div svg path{stroke: white !important;}
.roadmap-navbar > div a{margin-left: -45px;}
.roadmap-navbar > div a button{color: var(--white) ;}
.roadmap-content{margin-top: 40px;}
.roadmap-content .roadmap-lists .roadmap-lists-normal{
  display: flex;
  justify-content: space-between;
}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list:nth-child(2){margin: 0 20px;}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-header{margin-bottom: 20px;}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-header p{color: var(--deep-gray);}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item{
  margin-bottom: 20px;
  background-color: var(--white);
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  padding: 20px;
}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list:first-child .list-items .item{border-top: 6px solid var(--orang);}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list:nth-child(2) .list-items .item{border-top: 6px solid var(--primary);}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list:nth-child(3) .list-items .item{border-top: 6px solid var(--light-blue);}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-header{padding: 10px 10px 0 10px;}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-header span{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list:first-child .list-items .item .item-header span{background-color: var(--orang);}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list:nth-child(2) .list-items .item .item-header span{background-color: var(--primary);}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list:nth-child(3) .list-items .item .item-header span{background-color: var(--light-blue);}

.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-header p{ 
  display: inline-block;
  margin-left: 15px;
}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-body a{
  padding: 10px;
  border-radius: 10px;
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 150px;
  margin-bottom: 20px;
  text-decoration: unset;
}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-body a:hover{cursor: pointer;}

/* =========================================== */
/* =========================================== */
/* =========================================== */
/* =========================================== */
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-body a .feedback-box .feedback-header{color: var(--deep-dark-gray);}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-body a .feedback-box:hover .feedback-header{color: var(--dark-blue);}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-body a .feedback-box .feedback-body{margin: 15px 0; color: var(--deep-gray);}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-body a .feedback-box .tags .tag{
  min-width: 48px;
  text-align: center;
  background-color: var(--dark-gray);
  color: var(--dark-blue);
  font-weight: bold;
  font-size: 13px;
  border-radius: 10px;
  padding: 5px 15px;
  margin-left: unset;
}
/* =========================================== */
/* =========================================== */
/* =========================================== */
/* =========================================== */
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-footer .vote-count-box{
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 70px;
  height: 40px;
  border-radius: 10px;
  background-color: var(--dark-gray);
}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-footer .vote-count-box:hover{
  background-color: #CFD7FF;
  cursor: pointer;
}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item.voted .item-footer .vote-count-box{background-color: var(--dark-blue);}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-footer .vote-count-box .votes{
  margin-top: 8px;
  font-weight: bold;
  color: var(--deep-dark-gray);
}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item.voted .item-footer .vote-count-box .votes{color: var(--white);}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-footer .comments-count{
  display: flex;
  align-items: center;
}
.roadmap-content .roadmap-lists .roadmap-lists-normal .list .list-items .item .item-footer .comments-count .comment-count{
  margin-left: 15px;
  font-weight: bold;
}

@media screen and (min-width: 769px) and (max-width: 1200px){
  .roadmap{width: 100%;}
  .roadmap-navbar{width: 100%;}
  .roadmap-content .roadmap-lists {display: unset;}
  .roadmap-content .roadmap-lists .roadmap-lists-normal{
    display: flex;
    justify-content: space-between;
  }
  .roadmap-content .roadmap-lists .list:nth-child(2){margin: 0 15px;}
  .roadmap-content .roadmap-lists .roadmap-lists-normal .list{min-width: 223px;}
}


@media screen and (min-width: 375px) and (max-width: 768px){
  .roadmap,
  .roadmap-navbar{width: 100%;}
  .roadmap-navbar{
    height: 100px;
    border-radius: unset;
  }
  .roadmap-navbar>div>svg{margin-right: 15px;}
  .roadmap-navbar a button{
    width: 134px;
    height: 40px;
  }
  .roadmap-navbar a button svg{margin-right: 5px;}
  .roadmap-content{margin: unset;}
  .roadmap-content .roadmap-lists{flex-direction: column;}
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .tabs {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #c9c9c9;
    padding: 20px 0;
  }
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .tabs .tab {height: 60px;}
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .tabs .tab:hover{cursor: pointer;}
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .tabs .tab.active{
    color: var(--deep-dark-gray);
    border-bottom: 4.5px solid;
  }
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .tabs .tab.planned.active{border-color: var(--orang);}
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .tabs .tab.in-progress.active{border-color: var(--primary);}
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .tabs .tab.live.active{border-color: var(--light-blue);}
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .tabs .tab .tab-header{
    height: 60px;
    line-height: 60px;
    opacity: .4;
  }
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .tabs .tab.active .tab-header{opacity: 1;}
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .lists{padding: 20px;}
  
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .lists .list-items .item{
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: var(--white);
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    padding: 20px;
  }
  .roadmap-content .roadmap-lists .roadmap-lists-tabs .list.planned .list-items .item{border-top: 6px solid var(--orang);}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list.in-progress .list-items .item{border-top: 6px solid var(--primary);}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list.live .list-items .item{border-top: 6px solid var(--light-blue);}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-header{padding: 10px 10px 0 10px;}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-header span{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list.planned .list-items .item .item-header span{background-color: var(--orang);}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list.in-progress .list-items .item .item-header span{background-color: var(--primary);}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list.live .list-items .item .item-header span{background-color: var(--light-blue);}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-header p{ 
  display: inline-block;
  margin-left: 15px;
}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-body a{
  padding: 10px;
  border-radius: 10px;
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 150px;
  margin-bottom: 20px;
  text-decoration: unset;
}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-body a:hover{cursor: pointer;}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-body a .feedback-box .feedback-header{color: var(--deep-dark-gray);}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-body a .feedback-box:hover .feedback-header{color: var(--dark-blue);}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-body a .feedback-box .feedback-body{margin: 15px 0; color: var(--deep-gray);}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-body a .feedback-box .tags .tag{
  min-width: 48px;
  text-align: center;
  background-color: var(--dark-gray);
  color: var(--dark-blue);
  font-weight: bold;
  font-size: 13px;
  border-radius: 10px;
  padding: 5px 15px;
  margin-left: unset;
}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-footer .vote-count-box{
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 70px;
  height: 40px;
  border-radius: 10px;
  background-color: var(--dark-gray);
}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-footer .vote-count-box:hover{
  background-color: #CFD7FF;
  cursor: pointer;
}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item.voted .item-footer .vote-count-box{background-color: var(--dark-blue);}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-footer .vote-count-box .votes{
  margin-top: 8px;
  font-weight: bold;
  color: var(--deep-dark-gray);
}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item.voted .item-footer .vote-count-box .votes{color: var(--white);}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-footer .comments-count{
  display: flex;
  align-items: center;
}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .list .list-items .item .item-footer .comments-count .comment-count{
  margin-left: 15px;
  font-weight: bold;
}
.roadmap-content .roadmap-lists .roadmap-lists-tabs .lists .list .list-header{
  margin-bottom: 20px;
}
}
</style>