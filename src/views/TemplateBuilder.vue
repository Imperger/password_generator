<template>
<main class="fill-height">
    <form class="template">
        <TextInput :value="name" @input="name = $event" />
        <TextInput :value="template" @input="template = $event" class="template-text" />
        <GeneratorSettings
        :lowercase="lowercaseAlphabet"
        :uppercase="uppercaseAlphabet"
        :digits="digitsAlphabet"
        :symbols="symbolsAlphabet"
        :length="passwordLength"
        @update:lowercase="lowercaseAlphabet = $event"
        @update:uppercase="uppercaseAlphabet = $event"
        @update:digits="digitsAlphabet = $event"
        @update:symbols="symbolsAlphabet = $event"
        @update:length="passwordLength = $event"/>
        <div class="action-buttons">
          <ImgButton v-if="!isEditMode" @click="createTemplate"><Plus /></ImgButton>
          <ImgButton v-else @click="updateTemplate"><ContentSaveOutline /></ImgButton>
          <ImgButton v-if="isEditMode && !isLastTemplate" @click="deleteTemplate"><DeleteOutline /></ImgButton>
          <ImgButton @click="gotoGenerator"><ArrowLeftCircleOutline /></ImgButton>
        </div>
    </form>
</main>
</template>

<style scoped>
.fill-height {
  display: flex;
  height: 100vh;
}

.template {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 8px;
  border: 1px solid #000;
  border-radius: 5px;
}

.template-text {
  margin-top: 3px;
  margin-bottom: 5px;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

</style>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';

import GeneratorSettings from '@/components/GeneratorSettings.vue';
import CheckBox from '@/components/CheckBox.vue';
import ImgButton from '@/components/ImgButton.vue';
import NumberInput from '@/components/NumberInput.vue';
import TextInput from '@/components/TextInput.vue';
import { StoreMixin } from '@/mixins';
import type { GeneratorTemplate } from '@/store/settings';

@Component({
  components: {
    CheckBox,
    ImgButton,
    NumberInput,
    TextInput,
    GeneratorSettings
  }
})
export default class Settings extends Mixins(StoreMixin) {
  name = 'New template';
  template = '{rnd}';
  lowercaseAlphabet = true;
  uppercaseAlphabet = true;
  digitsAlphabet = true;
  symbolsAlphabet = true;
  passwordLength = 16;

  mounted (): void {
    if (this.isEditMode) {
      this.name = this.editedTemplate.name;
      this.template = this.editedTemplate.template;
      this.lowercaseAlphabet = this.editedTemplate.lowercaseAlphabet;
      this.uppercaseAlphabet = this.editedTemplate.uppercaseAlphabet;
      this.digitsAlphabet = this.editedTemplate.digitsAlphabet;
      this.symbolsAlphabet = this.editedTemplate.symbolsAlphabet;
      this.passwordLength = this.editedTemplate.passwordLength;
    }
  }

  get isEditMode (): boolean {
    return this.$route.params.id !== undefined;
  }

  get editedTemplateId (): number {
    return Number.parseInt(this.$route.params.id);
  }

  get editedTemplate (): GeneratorTemplate {
    return this.Settings.generatorTemplates.find(x => x.id === this.editedTemplateId)!;
  }

  get isLastTemplate (): boolean {
    return this.Settings.generatorTemplates.length === 1;
  }

  private gotoGenerator () {
    this.$router.push({ name: 'Generator' });
  }

  private async createTemplate (): Promise<void> {
    const templateId = await this.Settings.createTemplate({
      name: this.name,
      template: this.template,
      lowercaseAlphabet: this.lowercaseAlphabet,
      uppercaseAlphabet: this.uppercaseAlphabet,
      digitsAlphabet: this.digitsAlphabet,
      symbolsAlphabet: this.symbolsAlphabet,
      passwordLength: this.passwordLength
    });

    this.Settings.setActiveTemplate(templateId);

    this.$router.push({ name: 'Generator' });
  }

  private updateTemplate (): void {
    this.Settings.updateTemplate({
      id: this.editedTemplateId,
      name: this.name,
      template: this.template,
      lowercaseAlphabet: this.lowercaseAlphabet,
      uppercaseAlphabet: this.uppercaseAlphabet,
      digitsAlphabet: this.digitsAlphabet,
      symbolsAlphabet: this.symbolsAlphabet,
      passwordLength: this.passwordLength
    });

    this.$router.push({ name: 'Generator' });
  }

  private deleteTemplate (): void {
    this.Settings.removeTemplate(this.editedTemplateId);

    this.$router.push({ name: 'Generator' });
  }
}
</script>
