<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import menuIcon from '@/components/icons/hamburger.vue'
import closeIcon from '@/components/icons/close.vue'

const emit = defineEmits(['onCategorySelected'])

let categories = []
let categoriesArr = []
let plannedCount = ref({})
let inProgressCount = ref({})
let liveCount = ref({})
let allSelected = ref('all')
let categorySelected = ref({})



onMounted( async () => {
  getData()
  plannedData(categories);
  inProgressData(categories);
  LiveData(categories);
})

const getData = async () => {
  if(localStorage.getItem('feedbacks')){
    categories = JSON.parse(localStorage.getItem('feedbacks'))
  } else {
    let response = await axios.get('https://zolfikaar.github.io/product-feedback-app/data.json')
    categories = response.data.productRequests
  }

  categories.forEach(ele => {
    let category = ele.category
    if(!categoriesArr.includes(category)){
      categoriesArr.push(category)
    }
  })
}

const plannedData = data => plannedCount.value = data.filter((ele) => ele.status === 'planned')

const inProgressData = data => inProgressCount.value = data.filter((ele) => ele.status === 'in-progress')

const LiveData = data => liveCount.value = data.filter((ele) => ele.status === 'live')

const selectCategory = (category) => {

  if (category === 'all') {
    allSelected.value = category
    categorySelected.value = null
    emit('onCategorySelected', category)
  } else {
    categorySelected.value = category
    allSelected.value = null
    emit('onCategorySelected', category)
  }
  
};

let openMenu = ref(false)
let showSidebarCardsAtMobile = ref(false)

const toggleMenu = () => {
  openMenu.value = !openMenu.value
  showSidebarCardsAtMobile.value = !showSidebarCardsAtMobile.value
}
</script>

<template>
  
  <div class="sidebar">
    <div class="project-card">
      <div class="details">

        <h1>Frontend Mentor</h1>
        <p>Feedback Board</p>
      </div>
    </div>
    <div class="tags-card" >
      <div class="tags">
        <span class="tag" :class="{active: allSelected === 'all'}" @click="selectCategory('all')">All</span>

        <template v-for="category in categoriesArr" :key="category" >
          
          <span class="tag" @click="selectCategory(category)" :class="{active: categorySelected == category}">
            {{ category }}
          </span>
        </template>
      </div>
    </div>
    <div class="roadmap-card" >

      <div class="roadmap-header">
        <h1>Roadmap</h1>
        <router-link to="/roadmap">View</router-link>
      </div>

      <div class="roadmap-body">
        <div class="col">
          <div>
            <span></span>
            <p>Planned</p>
          </div>
          <div>
            <p>{{ plannedCount.length }}</p>
          </div>
        </div>
        <div class="col">
          <div>
            <span></span>
            <p>In-Progress</p>
          </div>
          <div>
            <p>{{ inProgressCount.length }}</p>
          </div>
        </div>
        <div class="col">
          <div>
            <span></span>
            <p>Live</p>
          </div>
          <div>
            <p>{{ liveCount.length }}</p>
          </div>
        </div>
      </div>

    </div>

    <div class="menu-btns" @click="toggleMenu">
      <div class="hamburger-btn" >
        <menuIcon v-if="!openMenu" />
      </div>
      <div class="close-btn" >
        <closeIcon v-if="openMenu"/>
      </div>
    </div>

    <div class="menu-box" v-if="openMenu">
      <div class="content-box" v-if="showSidebarCardsAtMobile">
        <div class="tags-card" >
          <div class="tags">
            <span class="tag" :class="{active: allSelected === 'all'}" @click="selectCategory('all')">All</span>

            <template v-for="category in categoriesArr" :key="category" >
              
              <span class="tag" @click="selectCategory(category)" :class="{active: categorySelected == category}">
                {{ category }}
              </span>
            </template>
          </div>
        </div>
        <div class="roadmap-card" >

          <div class="roadmap-header">
            <h1>Roadmap</h1>
            <router-link to="/roadmap">View</router-link>
          </div>

          <div class="roadmap-body">
            <div class="col">
              <div>
                <span></span>
                <p>Planned</p>
              </div>
              <div>
                <p>{{ plannedCount.length }}</p>
              </div>
            </div>
            <div class="col">
              <div>
                <span></span>
                <p>In-Progress</p>
              </div>
              <div>
                <p>{{ inProgressCount.length }}</p>
              </div>
            </div>
            <div class="col">
              <div>
                <span></span>
                <p>Live</p>
              </div>
              <div>
                <p>{{ liveCount.length }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>

</template>
<style>
.sidebar{
  margin-right: 20px;
  max-width: 255px;
}

.sidebar .project-card{
  background-image: url(/suggestions/desktop/background-header.png);
  width: 255px;
  height: 137px;
  color: var(--white);
  position: relative;
  border-radius: 10px;
}
.sidebar .tags-card{
  margin: 20px 0;
  min-height: 166px;
}
.sidebar .tags-card .tags{
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
.sidebar .tags-card .tags .tag{
  min-width: 48px;
  text-align: center;
  background-color: var(--dark-gray);
  color: var(--dark-blue);
  font-weight: bold;
  font-size: 13px;
  border-radius: 10px;
  padding: 5px 15px;
  margin: 5px;
}
.sidebar .tags-card .tags .tag:hover{
  cursor: pointer;
  background-color: #CFD7FF;
}
.sidebar .tags-card .tags .tag.active{
  background-color: var(--dark-blue);
  color: var(--white);
}
.sidebar .project-card .details{
  position: absolute;
  bottom: 20px;
  left: 20px;
}
.sidebar .roadmap-card{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  
}
.sidebar .roadmap-card .roadmap-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.sidebar .roadmap-card .roadmap-header a{color: var(--dark-blue);font-weight: 600;}
.sidebar .roadmap-card .roadmap-header a:hover{text-decoration: underline;color: var(--dark-blue-hvr);}
.sidebar .roadmap-card .roadmap-body .col{
  display: flex;
  justify-content: space-between;
}
.sidebar .roadmap-card .roadmap-body .col>div>span{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.sidebar .roadmap-card .roadmap-body > div.col:nth-child(1) > div,
.sidebar .roadmap-card .roadmap-body > div.col:nth-child(2) > div,
.sidebar .roadmap-card .roadmap-body > div.col:nth-child(3) > div{display: flex; align-items: center;}
.sidebar .roadmap-card .roadmap-body > div.col > div > span{margin-right: 10px;}
.sidebar .roadmap-card .roadmap-body > div.col:nth-child(1) > div:nth-child(1) > span{background-color: var(--orang);}
.sidebar .roadmap-card .roadmap-body > div.col:nth-child(2) > div:nth-child(1) > span{background-color: var(--primary);}
.sidebar .roadmap-card .roadmap-body > div.col:nth-child(3) > div:nth-child(1) > span{background-color: var(--light-blue);}
.sidebar > div.roadmap-card > div.roadmap-body > div > div:nth-child(2) > p{font-weight: bold;}
.sidebar .menu-box,
.sidebar .menu-btns{
  display: none;
}


@media screen and (min-width: 375px) and (max-width: 768px){
.sidebar{
    position: relative;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: unset;
  }

  .sidebar .project-card {
    background-image: url(/suggestions/mobile/background-header.png);
    background-size: cover;
    width: 100%;
    height: 72px;
    border-radius: unset;
  }
  
  .sidebar .menu-btns{
    display: block;
    position: absolute;
    right: 20px;
  }
  .sidebar .menu-btns:hover{
    cursor: pointer;
  }
  .sidebar .menu-btns .hamburger-btn{
    display: block;
  }
  .sidebar .menu-btns .close-btn{
    display: block;
  }
  
  .sidebar .menu-box{
    display: block;
    position: absolute;
    right: 0;
    top: 72px;
    background-color: rgba(0, 0, 0, .3);
    z-index: 10;
    height: 100vh;
    width: 100%;
  }
  .sidebar .menu-box .content-box{
    position: absolute;
    right: 0;
    z-index: 11;
    height: 100vh;
    background-color: var(--light-gray);
    width: 70%;
  }


  .sidebar .project-card .details {
    bottom: unset;
  }
  .sidebar .roadmap-card{
    top: 275px;
  }
  .sidebar .tags-card{
    top: 75px;
  }

  .sidebar .roadmap-card,
  .sidebar .tags-card{
    display: none;
    position: absolute;
    right: 20px;
    z-index: 12;
    width: 60%;
  }
  .sidebar .menu-box .content-box .roadmap-card,
  .sidebar .menu-box .content-box .tags-card{
    position: unset;
    display: block;
    width: 90%;
    margin: 20px auto;
  }
}

@media screen and (min-width: 769px) and (max-width: 1200px){
  .sidebar{
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: unset;
  }
  .sidebar .roadmap-card,
  .sidebar .tags-card,
  .sidebar .project-card {
    width: 223px;
    height: 178px;
  }
  .sidebar .roadmap-card,
  .sidebar .tags-card{
    display: block;
  }
  .sidebar .project-card {
    background-image: url(/suggestions/tablet/background-header.png);
  }
}
</style>