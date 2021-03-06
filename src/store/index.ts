import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Settings from './settings';
import App from './app';

export { default as Settings } from './settings';
export { default as App } from './app';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app: App,
    settings: Settings
  },
  plugins: [createPersistedState({
    paths: [
      'settings.lowercaseAlphabet',
      'settings.uppercaseAlphabet',
      'settings.digitsAlphabet',
      'settings.symbolsAlphabet',
      'settings.passwordLength']
  })]
});
