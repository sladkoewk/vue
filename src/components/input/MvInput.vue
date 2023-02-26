<script setup lang="ts">
import MvIcon from '@/components/icon/MvIcon.vue';
import { validators, type Validators } from "../../tools/validators";
import { computed, ref, watchEffect } from 'vue';

export interface InputProps {
  modelValue?: InputModel;
  /** A text label that will “float” up above the input field, once the field gets focus */
  label?: string;
  placeholder?: string;
  /** Does field have validation errors? */
  isValid?: boolean;
  clearable?: boolean;
  /**
   * Array of Functions 
   * @example
   * :rules="[ modelValue => modelValue.value.length <= 3 || 'Please use maximum 3 characters' ]"
   * :rules="[ (modelValue, validators) => validators.isEmail(modelValue.value) ]"
   */
  rules?: Array<(inputModel: InputModel, validators: Validators) => (string | boolean)>;
}

export interface InputModel {
  value: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  clearable: true,
  modelValue: () => (<InputModel>{ value: "" }),
  isValid: () => true
})

const emit = defineEmits<{
  (event: "update:modelValue", payload: InputModel): void;
  (event: "update:isValid", payload: boolean): void;
}>();

function clear() {
  emit("update:modelValue", <InputModel>{
    ...props.modelValue,
    value: "",
  });
}

const computedTextValue = computed({
  get: (): string => {
    return props.modelValue.value;
  },
  set: (newValue: string) =>
    emit("update:modelValue", <InputModel>{
      ...props.modelValue,
      value: newValue,
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
</script>

<template>
  <div class="mv-input">
    <label v-if="props.label">{{ props.label }}</label>
    <input type="text" v-model="computedTextValue" />
    <MvIcon :name="'clear'" v-if="props.clearable" class="mv-input__clear-icon" @click="clear"></MvIcon>
    <span v-if="!props.isValid" class="mv-input__error-message">{{ errorMessage }}</span>
  </div>
</template>
