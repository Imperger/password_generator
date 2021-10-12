<template>
<main class="fillHeight">
  <div class="centered">
    <CopyableTextInput :value="App.password" @input="App.setPassword" />
    <ImgButton @click="generatePassword" class="generateButton">
      <LockOpenOutline />
    </ImgButton>
    <ImgButton @click="goToSettings" class="settingsButton">
      <CogOutline />
    </ImgButton>
  </div>
</main>
</template>

<style scoped>
.fillHeight {
    display: flex;
    height: 100vh;
}
.centered {
    margin: auto;
}
.generateButton {
  left: 134px;
}
.settingsButton {
  left: 220px;
}
</style>

<script lang="ts">
import { Component, Mixins, Vue, Prop } from 'vue-property-decorator';

import CopyableTextInput from '@/components/CopyableTextInput.vue';
import ImgButton from '@/components/ImgButton.vue';
import { GeneratorOptions, PasswordGenerator, PasswordGeneratorOptionsFactory } from '@/common/password-generator';
import { StoreMixin } from '@/mixins';

@Component({
  components: {
    CopyableTextInput,
    ImgButton
  }
})
export default class Generator extends Mixins(StoreMixin) {
  private gen!: PasswordGenerator;

  public created (): void {
    this.gen = new PasswordGenerator();
  }

  public mounted (): void {
    document.addEventListener('keydown', this.generateByEnter);
  }

  public destroyed (): void {
    document.removeEventListener('keydown', this.generateByEnter);
  }

  private goToSettings (): void {
    this.$router.push({ name: 'Settings' });
  }

  private generatePassword (): void {
    this.App.setPassword(this.gen.generate(this.generatorOptions));
  }

  private generateByEnter = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      this.generatePassword();
    }
  };

  private get generatorOptions (): GeneratorOptions {
    const fact = new PasswordGeneratorOptionsFactory();

    if (this.Settings.lowercaseAlphabet) {
      fact.addLowercase();
    }

    if (this.Settings.uppercaseAlphabet) {
      fact.addUppercase();
    }

    if (this.Settings.digitsAlphabet) {
      fact.addDigits();
    }

    if (this.Settings.symbolsAlphabet) {
      fact.addSymbols();
    }

    return fact.options();
  }
}
</script>
