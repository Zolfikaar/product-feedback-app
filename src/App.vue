<script >
import { RouterView } from 'vue-router'
import Sidebar from '@/components/sidebar.vue'
import Topbar from '@/components/topbar.vue'

  export default {
    components: {
      Sidebar,
      Topbar
    }
    
  }
</script>

<template>
  <div class="container">

    <div class="content-wrapper">
      
      <Sidebar />
      
      <div class="main-content">
        <Topbar />
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