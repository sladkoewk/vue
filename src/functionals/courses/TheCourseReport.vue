<script setup lang="ts">
import TextfieldBaseWritebleComputed from '@/components/TextfieldBaseWritebleComputed.vue';
import { ref, watch } from 'vue';
import CommunityIcon from '../../components/icons/IconCommunity.vue'
import DocumentationIcon from '../../components/icons/IconDocumentation.vue'
import TextfieldBasePropsEmits from '../../components/TextfieldBasePropsEmits.vue'
import type { TextfieldModel } from '@/interfaces/inputs';


const filter = ref({ comment: "", })

const filter2 = ref({
  comment: <TextfieldModel>{
    textValue: "",
    label: "Комментарий",
    clearable: true
  },
})

function toLocaleLowerCase() {
  filter2.value = {
    ...filter2.value, comment: {
      ...filter2.value.comment,
      textValue: filter2?.value?.comment?.textValue?.toLocaleLowerCase(),
    }
  };
}
</script>

<template>
  <h1>Отчёт по курсам {{ filter.comment }}</h1>

  <p>TextfieldBasePropsEmits -> {{ filter.comment }}</p>
  <TextfieldBasePropsEmits v-model="filter.comment">
    <template #prepend>
      <CommunityIcon />
    </template>
    <template #append>
      <DocumentationIcon />
    </template>
  </TextfieldBasePropsEmits>
  <br>
  <p>TextfieldBasePropsEmits -> {{ filter2.comment.textValue }}</p>
  <TextfieldBaseWritebleComputed v-model="filter2.comment">
    <template #prepend>
      <CommunityIcon />
    </template>
    <template #append>
      <DocumentationIcon />
    </template>
  </TextfieldBaseWritebleComputed>
  <p>TextfieldBasePropsEmits -> {{ filter2.comment.textValue }}</p>
  <TextfieldBaseWritebleComputed v-model="filter2.comment">
    <template #prepend>
      <CommunityIcon />
    </template>
    <template #append>
      <DocumentationIcon />
    </template>
  </TextfieldBaseWritebleComputed>
  <button @click="toLocaleLowerCase">PrintFilter2</button>
</template >
      