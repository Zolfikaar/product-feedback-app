<script setup>
import { defineEmits, onMounted, ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['onFilterSelected'])

import checkIcon from '@/components/icons/check.vue'
import iconSuggestions from '@/components/icons/suggestions.vue'
import plusIcon from '@/components/icons/plus.vue'
import upArrowIcon from '@/components/icons/arrowUp.vue'

let showFilterDropdown = ref(false)
let selectedFilter = ref(null);
let filtersArr = [
  'Most upvotes',
  'Least upvotes',
  'Most comments',
  'Least comments',
]

let feedbacks = ref([])
let suggestionsCount = ref([])

onMounted( async () => {
  if(localStorage.getItem('feedbacks')){
    feedbacks.value = JSON.parse(localStorage.getItem('feedbacks'))
  } else {
    let response = await axios.get('../../data.json')
    feedbacks.value = response.data.productRequests
  }

  suggestionsCount.value = feedbacks.value.filter(ele => ele.status == 'suggestion').length
})

const toggleFilterDropdown = () => showFilterDropdown.value = !showFilterDropdown.value

const selectFilter = (index, event) => {
  event.stopPropagation(); // Stop event propagation
  toggleFilterDropdown()
  selectedFilter.value = filtersArr[index]
  emit('onFilterSelected', selectedFilter.value)
}
</script>

<template>
  <nav class="topbar">
    <div class="suggestions-box">
      <iconSuggestions />
      <h1 class="suggest-count"><span v-text="suggestionsCount ? suggestionsCount : 0"></span> Suggestions</h1>
      <span class="sort-by">Sort by: </span>

      <div class="filter-group">

        <div class="select-box" @click="toggleFilterDropdown" :class="{active:showFilterDropdown}">
          <div class="filter-selected-value" >
            {{ selectedFilter !== null ? selectedFilter : 'Most Upvoted' }}
          </div>

          <upArrowIcon class="arrow-icon" :style="showFilterDropdown ? 'transform: rotate(0deg)' : 'transform: rotate(180deg)'"/>
          
          <div class="filter-dropdown" v-show="showFilterDropdown">

            <span 
              class="filter" 
              :class="{ selected: filtersArr.indexOf(selectedFilter) === index }" 
              v-for="(filter,index) in filtersArr" 
              :key="index"
              @click="($event) => selectFilter(index, $event)"
              :topbarFilter="filter">
              {{ filter }}
              <checkIcon v-if="filtersArr.indexOf(selectedFilter) === index" />
            </span>

          </div>

        </div>
      </div>
      <!-- <select value="">
          <option name="" id="" value="1" selected>Most upvotes</option>
          <option name="" id="" value="2">Least upvotes</option>
          <option name="" id="" value="3">Most comments</option>
          <option name="" id="" value="4">Least comments</option>
      </select> -->
    </div>


    <router-link to="/new-feedback"><button class="primary"><plusIcon /> Add Feedback</button></router-link>
  </nav>
</template>

<style scoped>
.topbar{
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  line-height: 72px;
  width: 100%;
  background-color: var(--navbar);
  color: var(--white);
}
.topbar button{
  margin-right: 20px;
  cursor: pointer;
}
.suggestions-box{
  display: flex;
  align-items: center;
}



.topbar .suggestions-box .filter-group{margin: 20px 0;}
.topbar .suggestions-box .filter-group .select-box{
  width: 180px;
  height: 48px;
  padding: 0 20px;
  position: relative;
  /* background-color: var(--light-gray); */
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topbar .suggestions-box .filter-group .select-box:hover{cursor: pointer;}
.topbar .suggestions-box .filter-group .select-box .arrow-icon{transform: rotate(180deg);}
.topbar .suggestions-box .filter-group .select-box .filter-dropdown{
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
.topbar .suggestions-box .filter-group .select-box .filter-dropdown .filter{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 20px;
  color: var(--deep-gray);
}
.topbar .suggestions-box .filter-group .select-box .filter-dropdown .filter:not(:last-child){border-bottom: 1px solid rgba(0,0,0,.15);}
.topbar .suggestions-box .filter-group .select-box .filter-dropdown .filter:hover,
.topbar .suggestions-box .filter-group .select-box .filter-dropdown .filter.selected{color: var(--primary);}







.suggestions-box svg{margin-left: 20px;}
.suggestions-box .suggest-count{margin: 0 50px 0 20px;}
.suggestions-box .sort-by{
  color: var(--dark-gray);
  margin-right: 10px;
  font-size: 14px;
}
.suggestions-box select{
  background-color: unset;
  color: var(--white);
  font-weight: bold;
  font-size: 16px;
  border: none;
}
.suggestions-box select:hover{cursor: pointer;}
.suggestions-box select option{color: var(--deep-gray);}
.suggestions-box select option:hover{
  cursor: pointer;
  color: var(--primary);
}
</style>
