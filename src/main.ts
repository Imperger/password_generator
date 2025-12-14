import Vue from 'vue';
import ContentCopy from 'vue-material-design-icons/ContentCopy.vue';
import LockOpenOutline from 'vue-material-design-icons/LockOpenOutline.vue';
import CogOutline from 'vue-material-design-icons/CogOutline.vue';
import ArrowLeftCircleOutline from 'vue-material-design-icons/ArrowLeftCircleOutline.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import ContentSaveOutline from 'vue-material-design-icons/ContentSaveOutline.vue';
import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.component('ContentCopy', ContentCopy);
Vue.component('LockOpenOutline', LockOpenOutline);
Vue.component('CogOutline', CogOutline);
Vue.component('ArrowLeftCircleOutline', ArrowLeftCircleOutline);
Vue.component('Plus', Plus);
Vue.component('ContentSaveOutline', ContentSaveOutline);
Vue.component('DeleteOutline', DeleteOutline);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

(async function () {
  if (!await navigator.serviceWorker.getRegistration()) {
    await navigator.serviceWorker.register(`${process.env.VUE_APP_BASE_URL}sw.js`);
  }
})();
