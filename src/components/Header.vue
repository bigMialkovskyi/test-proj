<template>
  <header class="header">
    <p>Hello World</p>
    <router-link to="/">
      <img class="home-btn" v-if="this.$route.name == 'movie-page'" src="../assets/home.svg" alt="">
    </router-link>
  </header>
</template>
  
<script>

</script>
  
<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 7vh;
  background-color: rgb(3, 37, 65);
  padding: 2vh 0 2vh 0;

  p {
    color: aliceblue;
  }
}

.home-btn {
  height: 5vh;
  filter: invert(99%) sepia(93%) saturate(26%) hue-rotate(231deg) brightness(107%) contrast(100%);
}
</style>
  