<script setup lang="ts">
import { Size, TextColor, BackgroundColor } from "../../styles/styles";
import MvIcon from '@/components/icon/MvIcon.vue';
import { computed, reactive, ref, watchEffect } from "vue";
import MvSpinner from "../spinner/MvSpinner.vue";
import { SpinnerType } from "../spinner/MvSpinnerType";

export interface ButtonProps {
  /**
   * The text that will be shown on the button
   */
  label?: string | number;
  color?: TextColor;
  backgroundColor?: BackgroundColor;
  iconLeft?: string;
  iconRight?: string;
  /**
   * Avoid label text wrapping
   */
  noWrap?: boolean;
  /**
   * When used on flexbox parent, button will stretch to parent's height
   */
  stretch?: boolean;
  /**
   * Put button into loading state
   */
  loading?: boolean;
  /**
   * Native <a> link href attribute
   * @example href="https://quasar.dev" target="_blank"
   */
  href?: string;
  /**
   * Native <a> link target attribute
   */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /**
   * Put component in disabled mode
   */
  disable?: boolean;
  size?: Size;
  /**
   * Makes a circle shaped button
   */
  round?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: Size.M,
  color: TextColor.ACCENT,
});

const classArray = ref(["mv-button", props.color, props.backgroundColor, props.size]);

const classObject = computed(() => ({
  'mv-button--no-wrap': props.noWrap,
  'mv-button--stretch': props.stretch,
  'mv-button--round': props.round,
  'mv-button--disable': props.disable,
}))

const isLink = (props: ButtonProps) => !!props.href;

</script>

<template>
  <template v-if="isLink(props)">
    <a :href="props.href" :target="props.target" :class="[classArray, classObject]">
      <MvIcon v-if="props.iconLeft" :name="props.iconLeft"></MvIcon>
      <span>
        <slot>
          {{ props.label }}
        </slot>
      </span>
      <MvIcon v-if="props.iconRight" :name="props.iconRight"></MvIcon>
      <MvSpinner :type="SpinnerType.BOUNCE" :class="'mv-button--spinner'" v-if="props.loading"></MvSpinner>
    </a>
  </template>
  <template v-else>
    <button :class="[classArray, classObject]">
      <MvIcon v-if="props.iconLeft" :name="props.iconLeft"></MvIcon>
      <span>
        <slot>
          {{ props.label }}
        </slot>
      </span>
      <MvIcon v-if="props.iconRight" :name="props.iconRight"></MvIcon>
      <MvSpinner :type="SpinnerType.BOUNCE" :class="'mv-button--spinner'" v-if="props.loading"></MvSpinner>
    </button>
  </template>
</template>
