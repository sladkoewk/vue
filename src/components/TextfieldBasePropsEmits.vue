<script setup lang="ts">

interface Props {
  modelValue?: string;
}

const props = defineProps<Props>();
defineEmits(['update:modelValue']);

</script>

<template>
  <div class="textfield">
    <div class="textfield__prepend-icon">
      <slot name="prepend"></slot>
    </div>
    <input :value="props.modelValue" @input="$emit('update:modelValue', $event?.target?.value)" />
    <div class="textfield__append-icon">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<style>
</style>
