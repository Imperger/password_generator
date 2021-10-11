<template>
<div id="app">
  <router-view/>
</div>
</template>

<style>
body, html {
  margin: 0;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue { }
</script>
