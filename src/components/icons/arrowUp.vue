<script>
export default {
  props: {
    isVoted: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 6l4-4 4 4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd" :style="{ stroke: isVoted ? '#fff' : '#4661E6' }"/></svg>
</template>
