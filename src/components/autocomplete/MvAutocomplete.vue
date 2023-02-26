<script setup lang="ts">
import MvIcon from '@/components/icon/MvIcon.vue';
import { validators, type Validators } from "../../tools/validators";
import { computed, ref, watchEffect } from 'vue';
import type { KeyType } from "./MvAutocomplete";

export interface AutocompleteProps {
  code: string;
  keyLabel: string;
  key?: string;
  keyType?: KeyType;
  filter?: Object;
  modelValue?: AutocompleteModel;
  /** A text label that will “float” up above the input field, once the field gets focus */
  label?: string;
  placeholder?: string;
  /** Does field have validation errors? */
  isValid?: boolean;
  serverPath: string;
  clearable?: boolean;
  extends?: Object;
  /**
   * Array of Functions 
   * @example
   * :rules="[ modelValue => modelValue.value.length <= 3 || 'Please use maximum 3 characters' ]"
   * :rules="[ (modelValue, validators) => validators.isEmail(modelValue.value) ]"
   */
  rules?: Array<(inputModel: AutocompleteModel, validators: Validators) => (string | boolean)>;
}

export interface AutocompleteModel {
  text: string;
  value: Array<Object>;
}

const props = withDefaults(defineProps<AutocompleteProps>(), {
  clearable: true,
  modelValue: () => (<AutocompleteModel>{ text: "", value: [] }),
  isValid: () => true
})

const emit = defineEmits<{
  (event: "update:modelValue", payload: AutocompleteModel): void;
  (event: "update:isValid", payload: boolean): void;
}>();

function clear() {
  emit("update:modelValue", <AutocompleteModel>{
    ...props.modelValue,
    text: "",
    value: []
  });
}

const computedTextValue = computed({
  get: (): string => {
    return props.modelValue.text;
  },
  set: (newValue: string) =>
    emit("update:modelValue", <AutocompleteModel>{
      ...props.modelValue,
      text: newValue,
    }),
});

const errorMessage = ref("");

watchEffect(() => {
  if (props.rules?.length) {
    props.rules.every(rule => {
      const ruleResult = rule(props.modelValue, validators);
      if (ruleResult === true) {
        emit("update:isValid", true);
        return true;
      } else if (typeof ruleResult === "string") {
        emit("update:isValid", false)
        errorMessage.value = ruleResult;
        return false;
      }
    });
  }
})

function selectItem(item: Object) {
  emit("update:modelValue", <AutocompleteModel>{
    ...props.modelValue,
    value: [item],
  });
}

const items = ref([]);

watchEffect(async () => {
  //TODO: структура для отправки запроса автокомплита
  console.log(JSON.parse(JSON.stringify({
    text: props.modelValue.text,
    value: props.modelValue.value,
    key: props.key,
    keyType: props.keyType,
    code: props.code,
    extends: {
      filter: props.filter,
      ...props.extends
    }
  })));
  const url = props.serverPath;
  items.value = await (
    await fetch(`${url}?userId=${props.modelValue?.text}`)
  ).json();
});
</script>

<template>
  <div class="mv-input">
    <label v-if="props.label">{{ props.label }}</label>
    <input type="text" v-model="computedTextValue" />
    <MvIcon :name="'clear'" v-if="props.clearable" class="mv-input__clear-icon" @click="clear"></MvIcon>
    <span v-if="!props.isValid" class="mv-input__error-message">{{ errorMessage }}</span>
    <div class="options">
      <div class="item" v-for="item in items" @click="selectItem(item)">
        {{ item[props.keyLabel as keyof typeof item] }}
      </div>
    </div>
  </div>
</template>
