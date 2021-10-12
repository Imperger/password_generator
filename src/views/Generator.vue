<template>
<main class="fillHeight">
  <div class="centered">
    <CopyableTextInput :value="App.password" @input="App.setPassword" />
    <ImgButton @click="generatePassword" class="generateButton">
      <LockOpenOutline />
      <span class="tooltip">Generate new password</span>
    </ImgButton>
    <ImgButton @click="goToSettings" class="settingsButton">
      <CogOutline />
      <span class="tooltip">Settings</span>
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
import { ClipboardMixin, StoreMixin } from '@/mixins';

@Component({
  components: {
    CopyableTextInput,
    ImgButton
  }
})
export default class Generator extends Mixins(ClipboardMixin, StoreMixin) {
  private gen!: PasswordGenerator;

  public async created (): Promise<void> {
    this.gen = new PasswordGenerator();
  }

  public mounted (): void {
    document.addEventListener('keydown', this.onShortcuts);
  }

  public destroyed (): void {
    document.removeEventListener('keydown', this.onShortcuts);
  }

  private goToSettings (): void {
    this.$router.push({ name: 'Settings' });
  }

  private generatePassword (): void {
    this.App.setPassword(this.gen.generate(this.generatorOptions));
  }

  private onShortcuts = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      this.generatePassword();
    }
    if (e.ctrlKey && (e.code === 'KeyC' || e.code === 'Insert')) {
      this.clipboardCopy(this.password());
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

  private password () {
    return this.App.password;
  }
}
</script>
