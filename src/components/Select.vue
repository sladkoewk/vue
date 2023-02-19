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
  options?: OptionProps[]
}

export interface OptionProps {
  label: string;
}

export interface SelectModel {
  value?: any;
  id?: string | number;
}

export interface SelectMethods {
  clear: Function;
}

const emit = defineEmits<{
  (event: 'update:modelValue', payload: SelectModel): void;
}>();

const props = withDefaults(defineProps<SelectProps>(), {
  clearable: true,
});

function clear() {
  emit('update:modelValue', (<SelectModel>{ ...props.modelValue, value: undefined, id: undefined }))
}

const computedSelectValue = computed({
  get: (): SelectModel =>
    props.modelValue?.value,
  set: (newValue: SelectModel) =>
    emit('update:modelValue', (<SelectModel>{ ...props.modelValue, value: newValue, id: newValue.id }))
});

</script>

<template>
  <div class="select">
    <div class="select__prepend-icon">
      <slot name="prepend"></slot>
    </div>
    <select v-model="computedSelectValue">
      <option v-for="option in props.options" :value="option">
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
