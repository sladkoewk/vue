<script setup lang="ts">
import type { TextfieldModel } from '@/interfaces/inputs';
import { computed } from 'vue';
import ClearIcon from './icons/IconClear.vue'

interface Props {
  modelValue?: TextfieldModel;
  clearable?: boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'update:modelValue', payload: TextfieldModel): void;
}>();

const computedTextValue = computed({
  get: (): TextfieldModel => props.modelValue || {},
  set: (newValue: TextfieldModel) =>
    emit('update:modelValue', ({ ...props.modelValue, textValue: newValue.textValue }))
});

function clear() {
  emit('update:modelValue', ({ ...props.modelValue, textValue: "" }))
}

</script>

<template>
  <div class="textfield">
    <label>{{ props.modelValue?.label }}</label>
    <div class="textfield__prepend-icon">
      <slot name="prepend"></slot>
    </div>
    <input v-model="computedTextValue.textValue" />
    <div class="textfield__append-icon">
      <slot name="append"></slot>
    </div>
    <ClearIcon v-if="props.clearable || props.modelValue?.clearable" class="textfield__clear-icon" @click="clear">
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
