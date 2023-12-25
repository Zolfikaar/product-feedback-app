<script setup>
import { useRouter, RouterView } from 'vue-router'
import { onUpdated,onMounted, ref } from 'vue'
import Sidebar from '@/components/sidebar.vue'
import Topbar from '@/components/topbar.vue'

const router = useRouter()
let showTopbarAndSidebar = ref(true)

let selectedCategory = ref('all')
let selectedFilter = ref('Most upvotes')
const handleCategorySelected = category => selectedCategory.value = category
const handleFilterSelected = filter => selectedFilter.value = filter

router.beforeEach((to, from, next) => {
  showTopbarAndSidebar.value = to.meta.showTopbarAndSidebar !== false
  next()
})

</script>

<template>
  <div class="container">

    <div class="content-wrapper">
      
      <Sidebar v-if="showTopbarAndSidebar" @onCategorySelected="handleCategorySelected" />
      
      <div class="main-content">
        <Topbar v-if="showTopbarAndSidebar" 
        @onFilterSelected="handleFilterSelected" />
        <RouterView :categoryFilter="selectedCategory" :topbarFilter="selectedFilter"/>
      </div>
      
    </div>
  </div>

</template>

<style>
.container{
  width: 95%;
  margin: 0 auto;
}
.content-wrapper{
  display: flex;
  justify-content: space-between;
}
.main-content{
  width: 100%;
}

@media screen and (min-width: 375px) and (max-width: 768px){}

@media screen and (min-width: 787px) and (max-width: 1200px){
  .content-wrapper{
    flex-direction: column;
  }
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
  .sidebar .project-card {
    background-image: url(/suggestions/tablet/background-header.png);
  }
}
</style>