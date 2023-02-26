<script setup lang="ts">
import MvInput from "../../components/input/MvInput.vue"
import MvButton from "../../components/button/MvButton.vue"
import { ref, watchEffect } from "vue";

const exporting = ref(false);

async function exportReport() {
  exporting.value = true;
  // TODO: validate
  setTimeout(() => {
    exporting.value = false;
  }, 5000)
  // TODO: alert finish 
}

watchEffect(() => {
  console.log("exporting process: ", exporting.value)
});
</script>

<template>
  <h1>...</h1>
  <MvInput></MvInput>
  <MvButton @click="exportReport" :loading="exporting" :disable="exporting" :label="'Экспорт отчета'"
    :icon-right="'save'"></MvButton>
</template>
