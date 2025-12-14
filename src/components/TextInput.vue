<template>
<div class="text-input-component">
    <input :value="value" @input="onInput" type="text" class="input" />
</div>
</template>

<style scoped>
.text-input-component {
    border: 1px solid #000;
    white-space:nowrap;
}

.input {
    font-size: 1.2em;
    border: none;
    outline: none;
}
</style>

<script lang="ts">
import { Component, Model, Mixins, Vue, Prop } from 'vue-property-decorator';

import { ClipboardMixin } from '@/mixins';

interface InputValue {
    target: { value: string };
}

@Component
export default class TextInput extends Vue {
    @Model('input')
    private readonly value!: string;

    private onInput (e: InputEvent & InputValue) { this.$emit('input', e.target?.value); }
}
</script>
