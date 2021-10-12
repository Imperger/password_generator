<template>
<button :disabled="disabled" v-on="$listeners" type="button" class="imgButtonComponent">
    <slot></slot>
</button>
</template>

<style scoped>
.imgButtonComponent {
    position: relative;
    width: 37px;
    height: 37px;
    border: none;
    background-color: #ffffff00;
    cursor: pointer;
}
.imgButtonComponent:hover {
    background-color: rgb(168, 168, 168);
}
.imgButtonComponent .tooltip {
    position: absolute;
    left: 39px;
    top: 7px;
    opacity: 0;
    padding: 3px 5px;
    color: #fff;
    background-color: #000;
    border-radius: 2px;
    pointer-events: none;
    transition: opacity 0.5s ease-out;
}

.imgButtonComponent:hover .tooltip {
    opacity: 1;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
interface ConcreteListener {
    fns: () => Promise<void>;
}
@Component
export default class MyButton extends Vue {
    @Prop({ type: Boolean, default: false })
    private disabled!: boolean;
}
</script>
