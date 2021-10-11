<template>
<div class="copyableTextInputComponent">
    <input :value="value" @input="onInput" type="text" class="input" />
    <button @click="copyText" :disabled="copyDisabled" class="copyButton">
        <ContentCopy/>
        <span class="tooltip">Copy</span>
    </button>
</div>
</template>

<style scoped>
.copyableTextInputComponent {
    border: 1px solid #000;
    white-space:nowrap;
}
.input {
    font-size: 1.5em;
    border: none;
}
.input:focus {
    outline: none;
}
.copyButton {
    position: relative;
    width: 37px;
    height: 37px;
    border: none;
    border-left: 1px solid #000;
    background-color: #ffffff00;
    cursor: pointer;
}
.copyButton:hover {
    background-color: rgb(168, 168, 168);
}
.copyButton .tooltip {
    position: absolute;
    left: 39px;
    top: 7px;
    opacity: 0;
    padding: 3px 5px;
    color: #fff;
    background-color: #000;
    border-radius: 2px;
    transition: opacity 0.5s ease-out;
}

.copyButton:hover .tooltip {
    opacity: 1;
}
</style>

<script lang="ts">
import { Component, Model, Vue, Prop } from 'vue-property-decorator';

import { Clipboard } from '@/common/clipboard';

interface InputValue {
    target: { value: string };
}

@Component
export default class CopyableTextInput extends Vue {
    @Model('input')
    private readonly value!: string;

    private copyDisabled = false;
    private clipboard!: Clipboard;

    async created (): Promise<void> {
      this.clipboard = new Clipboard();
      this.copyDisabled = !await this.clipboard.RequestPermission();
    }

    private copyText () {
      this.clipboard.Copy(this.value);
    }

    private onInput (e: InputEvent & InputValue) { this.$emit('input', e.target?.value); }
}
</script>
