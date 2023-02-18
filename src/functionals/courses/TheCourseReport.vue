<script setup lang="ts">
import Textfield from '@/components/Textfield.vue';
import { ref } from 'vue';
import CommunityIcon from '../../components/icons/IconCommunity.vue'
import DocumentationIcon from '../../components/icons/IconDocumentation.vue'
import type { TextfieldModel } from '@/interfaces/inputs';


const filter2 = ref({
  comment: <TextfieldModel>{
    textValue: "",
    label: "Комментарий",
    clearable: true,
  },
  title: <TextfieldModel>{

  }
});

function toUpperCase() {
  filter2.value = {
    ...filter2.value, comment: {
      ...filter2.value.comment,
      textValue: filter2?.value?.comment?.textValue?.toUpperCase(),
    }
  };
}
</script>

<template>
  <h1>Отчёт по курсам</h1>

  <p>TextfieldBasePropsEmits -> {{ JSON.stringify(filter2, null, 4) }}</p>
  <Textfield v-model="filter2.comment" :clearable="true">
    <template #prepend>
      <CommunityIcon />
    </template>
    <template #append>
      <DocumentationIcon />
    </template>
  </Textfield>
  <p>TextfieldBasePropsEmits -> {{ filter2.comment.textValue }}</p>
  <Textfield v-model="filter2.comment">
    <template #prepend>
      <CommunityIcon />
    </template>
    <template #append>
      <DocumentationIcon />
    </template>
  </Textfield>
  <button @click="toLocaleLowerCase">Перевести введеный текст в верхний регистр</button>
</template >
      