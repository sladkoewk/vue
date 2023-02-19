<script setup lang="ts">
import Textfield from '@/components/Textfield.vue';
import Select from '@/components/Select.vue';
import { ref } from 'vue';
import CommunityIcon from '../../components/icons/IconCommunity.vue'
import DocumentationIcon from '../../components/icons/IconDocumentation.vue'
import type { TextfieldMethods, TextfieldModel, TextfieldProps } from '../../components/Textfield.vue';
import type { SelectModel } from '../../components/Select.vue';

const items = ref([
  {
    id: 1,
    label: 'Google',
    value: 'Google',
    description: 'Search engine',
    icon: 'mail'
  },
  {
    id: 2,
    label: 'Facebook',
    value: 'Facebook',
    description: 'Social media',
    icon: 'bluetooth',
    disable: true
  },
  {
    id: 3,
    label: 'Twitter',
    value: 'Twitter',
    description: 'Quick updates',
    icon: 'map'
  },
  {
    label: 'Apple',
    value: 'Apple',
    description: 'iStuff',
    icon: 'golf_course'
  },
  {
    label: 'Oracle',
    value: 'Oracle',
    disable: true,
    description: 'Databases',
    icon: 'casino'
  }
])

const filterValue = ref({
  comment: <TextfieldModel>{},
  company: <SelectModel>{}
});

const disabledFields = ref(false);

const input = ref<TextfieldMethods | null>(null)

function toUpperCase() {
  filterValue.value = {
    ...filterValue.value, comment: {
      ...filterValue.value.comment,
      value: filterValue.value.comment.value?.toUpperCase(),
    }
  };

}

function clearInputsTimeout() {
  setTimeout(() => input.value?.clear(), 1000)
}

function toggleAvailableFields() {
  disabledFields.value = !disabledFields.value;
}

// Проброс свойств полю через объект и директиву v-bind
const fieldProps = ref(<TextfieldProps>{
  label: "Комментарий",
  clearable: true,
})

// console.log(input.value.clear)
// watchEffect(() => {
//   if (input.value) {
//     // input.value.focus()
//     // console.log(input.value.clear())
//   } else {
//     // not mounted yet, or the element was unmounted (e.g. by v-if)
//   }
// })


</script>

<template>
  <h1>Отчёт по курсам</h1>

  <p>TextfieldBasePropsEmits -> {{ JSON.stringify(filterValue, null, 4) }}</p>
  <Textfield :disable="disabledFields" ref="input" v-bind="fieldProps" v-model="filterValue.comment">
    <template #prepend>
      <CommunityIcon />
    </template>
    <template #append>
      <DocumentationIcon />
    </template>
  </Textfield>
  <p>TextfieldBasePropsEmits -> {{ filterValue.comment.value }}</p>
  <Textfield :disable="disabledFields" :clearable="true" v-model="filterValue.comment">
  </Textfield>
  <button @click="toUpperCase">Перевести введенный текст в верхний регистр</button>
  <button @click="clearInputsTimeout">Удалить введенный текст через секунду</button>
  <Select :disable="disabledFields" :options="items" v-model="filterValue.company"></Select>
  <button @click="toggleAvailableFields">Переключить доступность полей</button>
</template >
      