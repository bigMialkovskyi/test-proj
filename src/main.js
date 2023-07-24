import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import lazyload from "./directives/lazyLoad";

Vue.config.productionTip = false

Vue.directive("lazyload", lazyload);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
