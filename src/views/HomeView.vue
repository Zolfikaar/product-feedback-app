<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import emptyIcon from '@/components/icons/empty.vue'
import plusIcon from '@/components/icons/plus.vue' 


const router = useRouter()

let feedbacks = ref([])

const showModal = ref(false)

onMounted( async () => {
  getAllFeedback()
})

const getAllFeedback = async () => {
    let response = await axios.get('@/data.json')

    feedbacks.value = response.data.productRequests
}

</script>

<template>
  
  <div class="home-content">

    <div class="content-box">
      
      <div class="content" v-if="showModal">
        content
      </div>

      <div class="no-feedback" v-else>
        <emptyIcon />
        <h1>There is no feedback yet.</h1>
        <p>
          Got a suggestion? Found a bug that needs to be squashed?<br>
          We love hearing about new ideas to improve our app.
        </p>
        <button class="primary"><plusIcon /> Add Feedback</button>
      </div>

    </div>
  </div>
</template>

<style scoped>

.content-box{
  background-color: var(--white);
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
}

.no-feedback{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 560px;
}
.no-feedback h1{
  margin: 20px 0;
}
.no-feedback p{
  margin-bottom: 50px;
}
</style>