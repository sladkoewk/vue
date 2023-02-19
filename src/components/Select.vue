<script setup lang="ts">
import { computed } from 'vue';
import ClearIcon from './icons/IconClear.vue'

export interface SelectProps {
  modelValue?: SelectModel;
  label?: string;
  clearable?: boolean;
  clearIcon?: boolean;
  errorMessage?: string;
  hint?: string;
  loading?: boolean;
  disable?: boolean;
  readonly?: boolean;
  options?: OptionProps[];
  onlyValue?: boolean;
}

export interface OptionProps {
  label: string;
  value: any;
  disable?: boolean;
}

export interface SelectModel {
  value?: any;
  label?: string;
}

export interface SelectMethods {
  clear: Function;
}

const emit = defineEmits<{
  (event: 'update:modelValue', payload: SelectModel): void;
}>();

const props = withDefaults(defineProps<SelectProps>(), {
  clearable: true,
  onlyValue: true
});

function clear() {
  emit('update:modelValue', (<SelectModel>{ ...props.modelValue, value: undefined, data: undefined }))
}

const computedSelectValue = computed({
  get: (): SelectModel => props.modelValue || {},
  set: (newValue: SelectModel) =>
    props.onlyValue ?
      emit('update:modelValue', (<SelectModel>{ value: newValue.value, label: newValue.label })) :
      emit('update:modelValue', (<SelectModel>{ ...newValue }))
});

</script>

<template>
  <div class="select">
    <div class="select__prepend-icon">
      <slot name="prepend"></slot>
    </div>
    <input v-model="computedSelectValue.label" />
    <select v-model="computedSelectValue" :readonly="props.readonly" :disabled="props.disable">
      <option v-for="option in props.options" :value="option" :disabled="option.disable">
        {{ option.label }}
      </option>
    </select>
    <div class="select__append-icon">
      <slot name="append"></slot>
    </div>
    <ClearIcon v-if="props.clearable" class="select__clear-icon" @click="clear">
    </ClearIcon>
  </div>
</template>

<style>
.select {
  display: flex;
  border: 2px solid black;
  width: fit-content;
}

input {
  background: none;
}

.select>* {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.select__clear-icon {
  width: 24px;
  height: 24px;
}
</style>
