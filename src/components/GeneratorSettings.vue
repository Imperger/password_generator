<template>
  <div>
    <CheckBox
      caption="lowercase"
      :checked="lowercase"
      @checked="$emit('update:lowercase', $event)"
    />
    <CheckBox
      caption="uppercase"
      :checked="uppercase"
      @checked="$emit('update:uppercase', $event)"
    />
    <CheckBox
      caption="digits"
      :checked="digits"
      @checked="$emit('update:digits', $event)"
    />
    <CheckBox
      caption="symbols"
      :checked="symbols"
      @checked="$emit('update:symbols', $event)"
    />
    <div class="passwordLength">
      <NumberInput
        class="passwordLengthInput"
        :min="minLength"
        :max="maxLength"
        :value="length"
        @input="$emit('update:length', $event)"
      />
      <span>length</span>
    </div>
  </div>
</template>

<style scoped>
.passwordLength {
  width: 102px;
  margin: 2px 20px 0px 20px;
}

.passwordLengthInput{
  width: 45px;
  margin-right: 6px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CheckBox from '@/components/CheckBox.vue';
import NumberInput from '@/components/NumberInput.vue';

@Component({
  components: { CheckBox, NumberInput }
})
export default class GeneratorSettings extends Vue {
  @Prop({ required: true }) lowercase!: boolean;
  @Prop({ required: true }) uppercase!: boolean;
  @Prop({ required: true }) digits!: boolean;
  @Prop({ required: true }) symbols!: boolean;

  @Prop({ required: true }) length!: number;
  @Prop({ default: 3 }) minLength!: number;
  @Prop({ default: 2048 }) maxLength!: number;
}
</script>
