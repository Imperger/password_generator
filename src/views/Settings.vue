<template>
<main class="fillHeight">
    <form class="settings">
        <CheckBox :checked="Settings.lowercaseAlphabet" @checked="Settings.switchLowercaseAlphabet" caption="lowercase" />
        <CheckBox :checked="Settings.uppercaseAlphabet" @checked="Settings.switchUppercaseAlphabet" caption="uppercase" />
        <CheckBox :checked="Settings.digitsAlphabet" @checked="Settings.switchDigitsAlphabet" caption="digits" />
        <CheckBox :checked="Settings.symbolsAlphabet" @checked="Settings.switchSymbolsAlphabet" caption="symbols" />
        <div class="passwordLength">
          <NumberInput :min="3" :max="2048" :value="Settings.passwordLength" @input="Settings.setPasswordLength" class="passwordLengthInput"/>
          <span>length</span>
        </div>
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

.passwordLength {
  width: 102px;
  margin: 2px 20px 0px 20px;
}
.passwordLengthInput{
  width: 45px;
  margin-right: 6px;
}
</style>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';

import CheckBox from '@/components/CheckBox.vue';
import ImgButton from '@/components/ImgButton.vue';
import NumberInput from '@/components/NumberInput.vue';
import { StoreMixin } from '@/mixins';

@Component({
  components: {
    CheckBox,
    ImgButton,
    NumberInput
  }
})
export default class Settings extends Mixins(StoreMixin) {
  private gotoGenerator () {
    this.$router.push({ name: 'Generator' });
  }
}
</script>
