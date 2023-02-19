<script setup lang="ts">
import Textfield from '@/components/Textfield.vue';
import Select from '@/components/Select.vue';
import { ref } from 'vue';
import CommunityIcon from '../../components/icons/IconCommunity.vue'
import DocumentationIcon from '../../components/icons/IconDocumentation.vue'
import type { TextfieldMethods, TextfieldModel, TextfieldProps } from '../../components/Textfield.vue';
import type { SelectModel } from '../../components/Select.vue';

const itemsForSelect = ref([
  {
    id: 1,
    label: 'Google',
    value: 'Google-id123',
    description: 'Search engine',
    icon: 'mail'
  },
  {
    id: 2,
    label: 'Facebook',
    value: 'Facebook-id234',
    description: 'Social media',
    icon: 'bluetooth',
    disable: true
  },
  {
    id: 3,
    label: 'Twitter',
    value: 'Twitter-id90',
    description: 'Quick updates',
    icon: 'map'
  },
  {
    label: 'Apple',
    value: 'Apple-id38',
    description: 'iStuff',
    icon: 'golf_course'
  },
  {
    label: 'Oracle',
    value: 'Oracle-id7382',
    disable: true,
    description: 'Databases',
    icon: 'casino'
  }
])

const filterValue = ref({
  comment: <TextfieldModel>{},
  note: <TextfieldModel>{ value: "Предзаполнение",/* additionalProp: "unneccesary"*/ },
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

function loadOtherModel() {
  filterValue.value = { "comment": { "value": "некоторый комментарий" }, "note": { "value": "заметка о радости от кодинга на vue" }, "company": { "id": 3, "label": "Twitter", "value": "Twitter-id90", "description": "Quick updates", "icon": "map" } };
}

// Проброс нескольких свойств полю через объект и директиву v-bind
const fieldProps = ref(<TextfieldProps>{
  label: "Комментарий",
  // clearable: true,
})

const checkedOnlyValueSelect = ref(true)

</script>

<template>
  <h1>Отчёт по курсам</h1>

  <p>FilterValue JSON -> {{ JSON.stringify(filterValue, null, 4) }}</p>
  <hr>
  <br>
  <Textfield :disable="disabledFields" ref="input" v-bind="fieldProps" v-model="filterValue.comment">
    <template #prepend>
      <CommunityIcon />
    </template>
    <template #append>
      <DocumentationIcon />
    </template>
  </Textfield>
  <br>
  <Textfield :label="'Заметка'" :disable="disabledFields" :clearable="true" v-model="filterValue.note">
  </Textfield>
  <br>
  <button @click="toUpperCase">Перевести введенный текст в верхний регистр</button>
  <br>
  <button @click="clearInputsTimeout">Удалить введенный текст поля комментария через секунду</button>
  <br>
  <br>
  <hr>
  <br>
  <Select :only-value="checkedOnlyValueSelect" :disable="disabledFields" :options="itemsForSelect"
    v-model="filterValue.company"></Select>
  <br>
  <input type="checkbox" id="checkbox" v-model="checkedOnlyValueSelect">
  <label for="checkbox">Только значение value в модели select: {{ checkedOnlyValueSelect }}</label>
  <br>
  <button @click="toggleAvailableFields">Переключить доступность полей</button>
  <br>
  <button @click="loadOtherModel">Загрузка другой модели из JSON</button>
</template >
      