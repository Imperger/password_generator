<template>
<div>
    <input :checked="checked" @input="onInput" :id="id" type="checkbox" class="checkbox">
    <label :for="id" class="checkboxLabel">{{ caption }}</label>
</div>
</template>

<style scoped>
.checkbox {
    opacity: 0;
}

.checkbox + .checkboxLabel {
    user-select: none;
}

.checkbox + .checkboxLabel::before {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 1px solid #000000;
    border-radius: 0.25em;
    margin-right: 0.5em;
    background-size: 50% 50%;
}

.checkbox:checked + .checkboxLabel::before {
    background-color: rgb(0, 0, 0);
}
</style>

<script lang="ts">
import { Component, Mixins, Model, Vue, Prop } from 'vue-property-decorator';

import UniqueIdMixin from '@/mixins/unique-id-mixin';

interface CheckBoxValue {
    target: { checked: boolean };
}

@Component
export default class CheckBox extends Mixins(UniqueIdMixin) {
    @Model('checked')
    private readonly checked!: boolean;

    @Prop({ type: String })
    private readonly caption!: string;

    private id!: string;

    public created (): void {
      this.id = `checkbox_${this.generateId()}`;
    }

    private onInput (e: InputEvent & CheckBoxValue) { this.$emit('checked', e.target?.checked); }
}
</script>
