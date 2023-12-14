<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import leftArrowIcon from '@/components/icons/arrowLeft.vue'
import plusIcon from '@/components/icons/plus.vue'
import upArrowIcon from '@/components/icons/arrowUp.vue'
import checkIcon from '@/components/icons/check.vue'
import editFeedbackIcon from '@/components/icons/editFeedback.vue'

const router = useRouter()

let showDropdown = ref(false)
let selectedCategoryIndex = ref(null);
let categoriesArr = []

let submitedTitle = ref('')
let isEmptyTitle = ref(false)

let submitedCategory = ref('')
let isEmptyCategory = ref(false)

let submitedDescription = ref('')
let isEmptyDescription = ref(false)

let notEmptyInputs = ref(false)

const categorySelectedRef = ref(null);

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})
const currentFeedback = ref()

onMounted( async () => {
  await loadCtegories()

  let data = JSON.parse(localStorage.getItem('feedbacks'))

  currentFeedback.value = data.find((item) => item.id == props.id);
  submitedTitle.value = currentFeedback.value.title;
  submitedDescription.value = currentFeedback.value.description
  submitedCategory.value = currentFeedback.value.category;
  selectedCategoryIndex.value = categoriesArr.indexOf(submitedCategory.value)

  
  // test purpose
  currentFeedback.title = submitedTitle.value
  currentFeedback.category = submitedCategory.value
  currentFeedback.description = submitedDescription.value
  
  // console.log(data.filter((item) => item.id == props.id));
})

const toggleDropdown = () => showDropdown.value = !showDropdown.value

const selectCategory = (index, event) => {
  event.stopPropagation(); // Stop event propagation
  submitedCategory.value = categoriesArr[index]
  toggleDropdown()
  selectedCategoryIndex.value = categoriesArr.indexOf(submitedCategory.value)
}

const loadCtegories = async () => {
  let categories = []

  if(localStorage.getItem('feedbacks')){
    categories = JSON.parse(localStorage.getItem('feedbacks'))

    categories.forEach(ele => {
      let category = ele.category
      if(!categoriesArr.includes(category)){
        categoriesArr.push(category)
      }
    })

  } else {
    let response = await axios.get('../../data.json')
    categories = response.data.productRequests

    categories.forEach(ele => {
      let category = ele.category
      if(!categoriesArr.includes(category)){
        categoriesArr.push(category)
      }
    })
  }
}

const checkSubmitedInputs = () => {
  if (submitedTitle.value === '') {
    isEmptyTitle.value = true;
  } else {
    isEmptyTitle.value = false;
  }
  if (submitedCategory.value === '') {
    isEmptyCategory.value = true;
  } else {
    isEmptyCategory.value = false;
  }
  if (submitedDescription.value === '') {
    isEmptyDescription.value = true;
  } else {
    isEmptyDescription.value = false;
  }

  if(!isEmptyTitle.value && !isEmptyCategory.value && !isEmptyDescription.value){
    return notEmptyInputs.value = true
  }
}

const resetForm = () => {
  // Clear the form fields
  submitedTitle = '';
  submitedCategory.value = '';
  submitedDescription = '';
}

const onSubmit = () => {
  checkSubmitedInputs()
  if(notEmptyInputs.value){
   let feedbacks = JSON.parse(localStorage.getItem('feedbacks'))

   let currentFeedback = feedbacks.filter((item) => item.id == props.id)

   currentFeedback.title = submitedTitle.value
   currentFeedback.category = submitedCategory.value
   currentFeedback.description = submitedDescription.value

    // Push the new feedback into the array
    feedbacks.push(currentFeedback);

    // Save the updated feedbacks array back to local storage
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

  }

  resetForm()

  // redirecting to home page
  router.push({ name: 'home'})
  
}

const deleteFeedback = () => {
  let feedbacks = JSON.parse(localStorage.getItem('feedbacks'))

  let currentFeedback = feedbacks.filter((item) => item.id == props.id)

  let index = feedbacks.indexOf(currentFeedback[0])

  if(index > -1) { // only splice array when item is found
    feedbacks.splice(index, 1) // 2nd parameter means remove one item only
  }

  // removeing the old feedbacks from local storage
  localStorage.removeItem('feedbacks')

  // saveing the updated feedbacks into local storage
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks))

  // redirecting to home page
  router.push({ name: 'home'})
  
} 

</script>

<template>
  <div class="new-feedback" >
    <nav class="new-feedback-navbar">
      <div>
        <leftArrowIcon />
        <router-link to="/"><button class="go-back">Go Back</button></router-link>
      </div>
      
    </nav>

    <div class="new-feedback-content">
      <editFeedbackIcon class="plus-icon" />

      <h1>Edit '{{ submitedTitle }}'</h1>

      <form action="" @submit.prevent="onSubmit">

        <div class="form-group title">
          <label for="title">Feedback Title</label>
          <p>Add a short, descriptive headline</p>
          <input type="text" id="title" name="title" v-model="submitedTitle" :class="{error: isEmptyTitle}">
        </div>

        <div class="form-group category-group">

          <label>Category</label>

          <p>Choose a category for your feedback</p>

          <div class="select-box" @click="toggleDropdown" :class="[{active:showDropdown},{error: isEmptyCategory}]">
            <!-- <div class="category-selected-value" ref="categorySelectedRef"> -->
            <div class="category-selected-value" >
              <!-- {{ selectedCategoryIndex !== null ? categoriesArr[selectedCategoryIndex] : 'Select a category' }}  -->
              {{ selectedCategoryIndex !== null ? submitedCategory : 'Select a category' }}
            </div>

            <upArrowIcon class="arrow-icon" :style="showDropdown ? 'transform: rotate(0deg)' : 'transform: rotate(180deg)'"/>
            
            <div class="category-dropdown" v-show="showDropdown">

              <span 
                class="category" 
                :class="{ selected: selectedCategoryIndex === index }" 
                v-for="(category,index) in categoriesArr" 
                :key="index"
                @click="($event) => selectCategory(index, $event)">
                {{ category }}
                <checkIcon v-if="selectedCategoryIndex === index" />
              </span>

            </div>

          </div>
        </div>

        <div class="form-group details">
          <label for="details">Feedback Detail</label>
          <p>Include any specific comments on what should be improved, added, etc.</p>
          <textarea type="text" id="details" name="details" v-model="submitedDescription" :class="{error: isEmptyDescription}"></textarea>
        </div>

        <div class="btns">
          <div>
            <button class="red" @click.self="deleteFeedback" >Delete</button>
          </div>
          <div>
            <button class="deep-dark-gray" @click.self="resetForm">Cancel</button>
            <button class="primary" type="submit"><plusIcon /> Update Feedback</button>
          </div>
        </div>

      </form>
    </div>

  </div>
</template>

<style>
.new-feedback{
  margin: 0 auto;
  width: 730px;
}
.new-feedback-navbar{height: 72px;}
.new-feedback-navbar > div a{margin-left: -45px;}
.new-feedback-content{
  background-color: var(--white);
  position: relative;
  padding: 20px 50px;
  border-radius: 10px;
  margin-top: 30px;
}
.new-feedback-content .plus-icon{
  position: absolute;
  top: -28px;
}
.new-feedback-content h1{
  margin: 20px 0;
  color: var(--deep-dark-gray);
}
.new-feedback-content form .form-group.category-group{margin: 20px 0;}
.new-feedback-content form .form-group.category-group .select-box{
  width: 100%;
  height: 48px;
  padding: 0 20px;
  position: relative;
  background-color: var(--light-gray);
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.new-feedback-content form .form-group.category-group .select-box:hover{cursor: pointer;}
.new-feedback-content form .form-group.category-group .select-box .arrow-icon{transform: rotate(180deg);}
.new-feedback-content form .form-group.category-group .select-box .category-dropdown{
  position: absolute;
  width: 100%;
  top: 60px;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  box-shadow: -5px 5px 20px 2px rgba(0,0,0,.1);
  z-index: 5;
  margin-left: -20px;
}
.new-feedback-content form .form-group.category-group .select-box .category-dropdown .category{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 20px;
  color: var(--deep-gray);
}
.new-feedback-content form .form-group.category-group .select-box .category-dropdown .category:not(:last-child){border-bottom: 1px solid rgba(0,0,0,.15);}
.new-feedback-content form .form-group.category-group .select-box .category-dropdown .category:hover,
.new-feedback-content form .form-group.category-group .select-box .category-dropdown .category.selected{color: var(--primary);}
.new-feedback-content form .form-group label{
  font-weight: bold;
  color: var(--deep-dark-gray);
}
.new-feedback-content form .form-group p{
  margin: 10px 0;
  color: var(--deep-gray);
}
.new-feedback-content form .form-group input,
.new-feedback-content form .form-group textarea{
  padding: 0 20px;
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: var(--light-gray);
}
.new-feedback-content form .form-group input{height: 48px;}
.new-feedback-content form .form-group textarea{
  height: 96px;
  resize: none;
}
.new-feedback-content form .form-group.category-group .select-box.active{
  border: 2px solid var(--primary);
  border-radius: 10px;
}
.new-feedback-content form .form-group textarea:focus,
.new-feedback-content form .form-group input:focus{outline-color: var(--primary);}
.new-feedback-content form .form-group.category-group .select-box.error{border: 2px solid var(--red);}
.new-feedback-content form .form-group textarea.error,
.new-feedback-content form .form-group input.error{border:2px solid var(--red);}
.new-feedback-content form .form-group textarea.error:focus,
.new-feedback-content form .form-group input.error:focus{outline-color: var(--red);}
.new-feedback-content form .btns{
  display: flex;
  justify-content: space-between;
  margin: 40px 0 20px 0;
}
.new-feedback-content form .btns .primary{margin-left: 10px;}
</style>
