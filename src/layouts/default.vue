<template>
  <div class="default-layout">
    <Header />
    <slot />
    <Footer />
  </div>
</template>
  
<script>
// компонент слугує своєрідним шаблоном
// містить в собі хедер та футер
// за допомогою слотів підставляється весь інший контент веб додатку
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "defaultLayout",
  components: {
    Header,
    Footer,
  },
};
</script>