<script setup>
import leftArrowIcon from '@/components/icons/arrowLeft.vue'
import commentsIcon from '@/components/icons/comments.vue'
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


    feedback details goes here, (we should recive the feedback id from router props)
  </div>
</template>

<style>
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
</style>
