<script setup lang="ts">
import MvInput, { type InputModel } from "../../components/input/MvInput.vue"
import MvButton from "../../components/button/MvButton.vue"
import { ref, watchEffect } from "vue";
import type { Validators } from "@/tools/validators";

/**
 * Статус процесса экспорта отчета
 */
const exporting = ref(false);

async function exportReport() {
  exporting.value = true;
  // TODO: validate
  setTimeout(() => {
    exporting.value = false;
  }, 5000)
}

const filterValue = ref({
  comment: <InputModel>{ value: "" }, //note: необязательная строка, служит для облегчения чтения
  email: <InputModel>{ value: "" } //note: необязательная строка, служит для облегчения чтения
})

const validate = ref({
  comment: undefined,
  email: undefined
});

const commentRules = [
  (model: InputModel) => model.value.length <= 3 ? "Комментарий пуст" : true,
  (model: InputModel) => model.value.length >= 10 ? "Комментарий превышает максимально допустимую длину" : true,
];

const emailRules = [
  (model: InputModel, validators: Validators) => validators.isEmail(model.value)
];
</script>

<template>
  <h3>Отчет</h3>
  <hr>
  {{ `filterValue -> ${JSON.stringify(filterValue)}` }}
  <hr>
  {{ `validate -> ${JSON.stringify(validate)}` }}
  <hr>
  <MvInput v-model:isValid="validate.comment" :rules="commentRules" :label="'Комментарий к экспортируемому отчету'"
    v-model="filterValue.comment">
  </MvInput>
  <MvInput v-model:isValid="validate.email" :rules="emailRules" :label="'Почтовый адрес сотрудника'"
    v-model="filterValue.email">
  </MvInput>
  <MvButton @click="exportReport" :loading="exporting" :disable="exporting" :label="'Экспорт отчета'"
    :icon-right="'save'"></MvButton>
</template>
