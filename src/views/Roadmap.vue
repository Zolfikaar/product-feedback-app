<script setup>
import leftArrowIcon from '@/components/icons/arrowLeft.vue'
import plusIcon from '@/components/icons/plus.vue'
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

    Roadmap content goes here
  </div>
</template>

<style>
.roadmap{
  margin: 0 auto;
  width: 730px;
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
.roadmap-navbar > div a button{
  color: var(--white) ;
}
</style>