import Vue from 'vue';
import ContentCopy from 'vue-material-design-icons/ContentCopy.vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.component('ContentCopy', ContentCopy);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
