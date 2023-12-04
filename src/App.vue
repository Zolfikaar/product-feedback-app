<script setup>
import { useRouter, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import Sidebar from '@/components/sidebar.vue'
import Topbar from '@/components/topbar.vue'

const router = useRouter()
let showTopbarAndSidebar = ref(true)

router.beforeEach((to, from, next) => {
  showTopbarAndSidebar.value = to.meta.showTopbarAndSidebar !== false
  next()
})

</script>

<template>
  <div class="container">

    <div class="content-wrapper">
      
      <Sidebar v-if="showTopbarAndSidebar" />
      
      <div class="main-content">
        <Topbar v-if="showTopbarAndSidebar"  />
        <RouterView />
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
</style>