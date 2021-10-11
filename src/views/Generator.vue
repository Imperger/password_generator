<template>
<main class="fillHeight">
    <CopyableTextInput v-model="password" class="centered" />
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
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import CopyableTextInput from '@/components/CopyableTextInput.vue';
import { PasswordGenerator, PasswordGeneratorOptionsFactory } from '@/common/password-generator';

@Component({
  components: {
    CopyableTextInput
  }
})
export default class Generator extends Vue {
  private password = '';
  private gen!: PasswordGenerator;
  private genOptions!: PasswordGeneratorOptionsFactory;

  public created (): void {
    this.gen = new PasswordGenerator();
    this.genOptions = new PasswordGeneratorOptionsFactory();

    this.genOptions
      .addLowercase()
      .addUppercase()
      .addNumbers()
      .addSymbols()
      .setLength(16);
  }

  private generatePassword (): void {
    this.password = this.gen.generate(this.genOptions.options());
  }

  private generateByEnter = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      this.generatePassword();
    }
  };

  public mounted (): void {
    document.addEventListener('keydown', this.generateByEnter);
  }

  public destroyed (): void {
    document.removeEventListener('keydown', this.generateByEnter);
  }
}
</script>
