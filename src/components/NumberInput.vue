<template>
<input :min="min" :max="max" :value="value" @input="onInput" type="number">
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>

<script lang="ts">
import { Component, Model, Vue, Prop } from 'vue-property-decorator';

interface InputValue {
    target: { valueAsNumber: number };
}

@Component
export default class NumberInput extends Vue {
    @Model('input', { type: Number })
    private readonly value!: number;

    @Prop({ type: Number, default: 0 })
    private readonly min!: number;

    @Prop({ type: Number, default: 100 })
    private readonly max!: number;

    private onInput (e: InputEvent & InputValue) { this.$emit('input', e.target?.valueAsNumber); }
}
</script>
