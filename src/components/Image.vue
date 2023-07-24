<template>
  <figure class="image__wrapper">
    <img class="image__item" :src="source" alt="random image">
  </figure>
</template>
</template>
  
<script>
export default {
  name: "Image",
  props: {
    source: {
      type: String,
      required: true
    }
  }
};
</script> 
  