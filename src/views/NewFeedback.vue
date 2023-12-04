<script setup>
import leftArrowIcon from '@/components/icons/arrowLeft.vue'
import plusIcon from '@/components/icons/plus.vue'
import upArrowIcon from '@/components/icons/arrowUp.vue'
import checkIcon from '@/components/icons/check.vue'
</script>

<template>
  <div class="new-feedback" >
    <nav class="new-feedback-navbar">
      <div>
        <leftArrowIcon />
        <router-link to="/"><button class="go-back">Go Back</button></router-link>
      </div>
      
    </nav>

New Feed back content (form) goes here

  </div>
</template>

<style>
.new-feedback{
  margin: 0 auto;
  width: 730px;
}
.new-feedback-navbar{
  height: 72px;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
}
.new-feedback-navbar > div a{margin-left: -45px;}
</style>
