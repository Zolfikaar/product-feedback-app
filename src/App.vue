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
  <Sidebar />
  <Topbar />

  <div class="main-content">
    <RouterView />
  </div>
</template>


