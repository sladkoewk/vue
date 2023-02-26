<script setup lang="ts">
import MvInput, { type InputModel } from "../../components/input/MvInput.vue"
import MvAutocomplete, { type AutocompleteModel } from "../../components/autocomplete/MvAutocomplete.vue"
import MvButton from "../../components/button/MvButton.vue"
import { ref } from "vue";
import type { Validators } from "@/tools/validators";
import { KeyType } from "@/components/autocomplete/MvAutocomplete";

/**
 * Статус процесса экспорта отчета
 */
const exporting = ref(false);

async function exportReport() {
  exporting.value = true;
  setTimeout(() => {
    exporting.value = false;
  }, 5000)
}

const filter = ref({
  comment: <InputModel>{ value: "" }, //note: необязательная строка, служит для облегчения чтения
  email: <InputModel>{ value: "" }, //note: необязательная строка, служит для облегчения чтения
  subs: <AutocompleteModel>{ value: [], text: "" }, //note: необязательная строка, служит для облегчения чтения
  orgs: <AutocompleteModel>{ value: [], text: "" } //note: необязательная строка, служит для облегчения чтения
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

const autocompleteProps = {
  serverPath: "https://jsonplaceholder.typicode.com/posts",
  filter,
  key: "id",
  keyLabel: "title",
  keyType: KeyType.NUMBER,
  // clearable: false,
  extends: { customProp: 1 }
};
</script>

<template>
  <h3>Отчет</h3>
  <hr>
  {{ `filter -> ${JSON.stringify(filter)}` }}
  <hr>
  {{ `validate -> ${JSON.stringify(validate)}` }}
  <hr>
  <MvInput v-model:isValid="validate.comment" :rules="commentRules" :label="'Комментарий к экспортируемому отчету'"
    v-model="filter.comment">
  </MvInput>
  <MvInput v-model:isValid="validate.email" :rules="emailRules" :label="'Почтовый адрес сотрудника'"
    v-model="filter.email">
  </MvInput>
  <MvAutocomplete v-model="filter.subs" v-bind="autocompleteProps" :label="'Подразделение'" :code="'subs'">
  </MvAutocomplete>
  <MvAutocomplete v-model="filter.orgs" v-bind="autocompleteProps" :label="'Организация'" :code="'orgs'">
  </MvAutocomplete>
  <MvButton @click="exportReport" :loading="exporting" :disable="exporting" :label="'Экспорт отчета'"
    :icon-right="'save'">
  </MvButton>
</template>
