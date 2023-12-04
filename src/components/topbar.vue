<script setup>
import iconSuggestions from '@/components/icons/suggestions.vue'
import plusIcon from '@/components/icons/plus.vue'
</script>

<template>
  <nav class="topbar">
    <div class="suggestions-box">
      <iconSuggestions />
      <h1 class="suggest-count"><span>6</span> Suggestions</h1>
      <span class="sort-by">Sort by: </span>
      <select value="">
          <option name="" id="" value="1" selected>Most upvotes</option>
          <option name="" id="" value="2">Least upvotes</option>
          <option name="" id="" value="3">Most comments</option>
          <option name="" id="" value="4">Least comments</option>
      </select>
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
.suggestions-box svg{
  margin-left: 20px;
}
.suggestions-box .suggest-count{
  margin: 0 50px 0 20px;
}
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
.suggestions-box select option{
  color: var(--deep-gray);
}
.suggestions-box select option:hover{
  cursor: pointer;
  color: var(--primary);
}
</style>
