<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
// компонент яки містить хедер та футер
import defaultLayout from "@/layouts/default.vue";

export default {
  components: {
    defaultLayout
  },
  computed: {
    layout: () => {
      return "defaultLayout";
    },
  },
}
</script>

<style lang="scss">
@import "./styles/default_styles.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
