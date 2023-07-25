<template>
  <header id="header" class="header">
    <p>Hello World</p>
    <!-- кнопка що певертає користувача на головну сторінку
      на сторінці реєстрації та сторінці входу в особистий кабінет вона не доступна
      щоб неавторизований користувач не міг відразу потрапити на головну сторінку -->
    <router-link to="/home">
      <img class="home-btn" v-if="this.$route.name == 'movie-page'" src="../assets/home.svg" alt="">
    </router-link>
    <!-- кнопка виходу з особистого кабінету
    повертає користувача на сторінку входу -->
    <router-link to="/">
      <img class="home-btn" v-if="this.$route.name !== 'login' && this.$route.name !== 'register'"
        src="../assets/log-out.svg" alt="">
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
  