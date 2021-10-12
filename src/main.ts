import Vue from 'vue';
import ContentCopy from 'vue-material-design-icons/ContentCopy.vue';
import LockOpenOutline from 'vue-material-design-icons/LockOpenOutline.vue';
import CogOutline from 'vue-material-design-icons/CogOutline.vue';
import ArrowLeftCircleOutline from 'vue-material-design-icons/ArrowLeftCircleOutline.vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.component('ContentCopy', ContentCopy);
Vue.component('LockOpenOutline', LockOpenOutline);
Vue.component('CogOutline', CogOutline);
Vue.component('ArrowLeftCircleOutline', ArrowLeftCircleOutline);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
