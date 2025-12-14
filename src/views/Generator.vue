<template>
<main class="fill-height">
  <div>
    <Select
    class="template-selector"
    :value="Settings.generatorTemplate.id.toString()"
    @input="Settings.setActiveTemplate(Number.parseInt($event))"
    :options="generatorsSelectorOptions"
    @create="openTemplateCreator"
    @edit="openTemplateEditor" />
    <CopyableTextInput :value="App.password" @input="App.setPassword" />
    <ImgButton @click="generatePassword" class="generate-button">
      <LockOpenOutline />
      <span class="tooltip">Generate new password</span>
    </ImgButton>
  </div>
</main>
</template>

<style scoped>
.fill-height {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.generate-button {
  left: 134px;
}
</style>

<script lang="ts">
import { Component, Mixins, Vue, Prop } from 'vue-property-decorator';

import CopyableTextInput from '@/components/CopyableTextInput.vue';
import ImgButton from '@/components/ImgButton.vue';
import Select, { SelectOption } from '@/components/TemplateSelector.vue';
import { GeneratorOptions, PasswordGenerator, PasswordGeneratorOptionsFactory } from '@/common/password-generator';
import { ClipboardMixin, StoreMixin } from '@/mixins';
import { applyTemplate } from '@/common/apply-template';
import { FormatDate } from '@/common/format-date';

@Component({
  components: {
    CopyableTextInput,
    ImgButton,
    Select
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

  private openTemplateCreator (templateId: string): void {
    this.$router.push({ name: 'CreateTemplate' });
  }

  private openTemplateEditor (templateId: string): void {
    this.$router.push({ name: 'EditTemplate', params: { id: templateId } });
  }

  private generatePassword (): void {
    const password = applyTemplate(this.Settings.generatorTemplate.template,
      {
        rnd: () => this.gen.generate(this.generatorOptions),
        date: () => FormatDate.fullDate(),
        year: () => FormatDate.year(),
        month: () => FormatDate.month(),
        day: () => FormatDate.day(),
        time: () => FormatDate.time(),
        ts: () => FormatDate.timestamp()
      });

    this.App.setPassword(password);
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
    const template = this.Settings.generatorTemplate;

    return new PasswordGeneratorOptionsFactory()
      .allowLowercase(template.lowercaseAlphabet)
      .allowUppercase(template.uppercaseAlphabet)
      .allowDigits(template.digitsAlphabet)
      .allowSymbols(template.symbolsAlphabet)
      .setLength(template.passwordLength)
      .options();
  }

  private password () {
    return this.App.password;
  }

  private get generatorsSelectorOptions (): SelectOption[] {
    return this.Settings.generatorTemplates.map(x => ({ value: x.id.toString(), label: x.name }));
  }
}
</script>
