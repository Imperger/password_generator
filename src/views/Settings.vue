<template>
<main class="fillHeight">
    <form class="settings">
        <CheckBox :checked="Settings.lowercaseAlphabet" @checked="Settings.switchLowercaseAlphabet" caption="Lowercase" />
        <CheckBox :checked="Settings.uppercaseAlphabet" @checked="Settings.switchUppercaseAlphabet" caption="Uppercase" />
        <CheckBox :checked="Settings.digitsAlphabet" @checked="Settings.switchDigitsAlphabet" caption="Digits" />
        <CheckBox :checked="Settings.symbolsAlphabet" @checked="Settings.switchSymbolsAlphabet" caption="Symbols" />
        <ImgButton @click="gotoGenerator" class="backButton"><ArrowLeftCircleOutline /></ImgButton>
    </form>
</main>
</template>

<style scoped>
.fillHeight {
    display: flex;
    height: 100vh;
}

.settings {
    margin: auto;
    padding: 8px 13px 6px 0px;
    border: 1px solid #000;
    border-radius: 5px;
}

.backButton {
    left: 47px;
}
</style>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';

import CheckBox from '@/components/CheckBox.vue';
import { StoreMixin } from '@/mixins';
import ImgButton from '@/components/ImgButton.vue';

@Component({
  components: {
    CheckBox,
    ImgButton
  }
})
export default class Settings extends Mixins(StoreMixin) {
  private gotoGenerator () {
    this.$router.push({ name: 'Generator' });
  }
}
</script>
