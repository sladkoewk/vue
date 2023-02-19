<script setup lang="ts">
import { computed } from 'vue';
import ClearIcon from './icons/IconClear.vue'

export interface TextfieldProps {
  label?: string;
  clearIcon?: boolean;
  errorMessage?: string;
  hint?: string;
  loading?: boolean;
  disable?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  modelValue?: TextfieldModel;
  validation?: Function;
  prefix?: string;
  suffix?: string;
  counter?: boolean;
  rules?: Function[];
  maxLength?: string;
  type?: "text" | "password";
}
export interface TextfieldModel {
  value?: string;
}

export interface TextfieldMethods {
  clear: Function;
}

const props = withDefaults(defineProps<TextfieldProps>(), {
  clearable: true,
});

const emit = defineEmits<{
  (event: 'update:modelValue', payload: TextfieldModel): void;
}>();

const computedTextValue = computed({
  get: (): TextfieldModel => {
    if (props?.modelValue?.value === "") {
      props.modelValue.value = undefined;
    }
    return props.modelValue || {};
  },
  set: (newValue: TextfieldModel) =>
    emit('update:modelValue', (<TextfieldModel>{ ...newValue }))
});

function clear() {
  emit('update:modelValue', (<TextfieldModel>{ ...props.modelValue, value: undefined }))
}

defineExpose<TextfieldMethods>({
  clear,
});

</script>

<template>
  <div class="textfield">
    <span>{{ props.label }}</span>
    <div class="textfield__prepend-icon">
      <slot name="prepend"></slot>
    </div>
    <input v-model="computedTextValue.value" :readonly="props.readonly" :disabled="props.disable" />
    <div class="textfield__append-icon">
      <slot name="append"></slot>
    </div>
    <ClearIcon v-if="props.clearable" class="textfield__clear-icon" @click="clear">
    </ClearIcon>
  </div>
</template>

<style>
.textfield {
  display: flex;
  border: 2px solid black;
  width: fit-content;
}

input {
  background: none;
}

.textfield>* {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.textfield__clear-icon {
  width: 24px;
  height: 24px;
}
</style>
