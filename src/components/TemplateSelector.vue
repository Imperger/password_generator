<template>
<div class="select-component">
  <ImgButton @click="$emit('create', value)" class="add-button">
    <Plus />
    <span class="tooltip">Create new template</span>
  </ImgButton>
  <select :value="value" @change="$emit('input', $event.target.value)">
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
  <ImgButton @click="$emit('edit', value)" class="edit-button">
    <CogOutline />
    <span class="tooltip">Edit active template</span>
  </ImgButton>
</div>
</template>

<style scoped>
.select-component {
    display: flex;
    border: 1px solid #000;
    margin-bottom: 10px;
}

.add-button {
  border-right: 1px solid #000;
}

select {
    flex-grow: 1;
    outline: none;
    border: none;
    font-size: 1.5em;
}

.edit-button {
    border-left: 1px solid #000;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import ImgButton from '@/components/ImgButton.vue';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  components: {
    ImgButton
  }
})
export default class TemplateSelector extends Vue {
  @Prop({ required: true }) value!: string;
  @Prop({ required: true }) options!: SelectOption[];
}
</script>
