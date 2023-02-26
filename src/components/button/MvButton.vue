<script setup lang="ts">
import { Size, TextColor, BackgroundColor } from "../../styles/styles";
import MvIcon from '@/components/icon/MvIcon.vue';
import { reactive } from "vue";
import MvSpinner from "../spinner/MvSpinner.vue";

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

const classArray = reactive([props.color, props.backgroundColor, props.size]);
const classObject = reactive({
  'no-wrap': props.noWrap,
  'stretch': props.stretch,
  'round': props.round
});

const isLink = (props: ButtonProps) => !!props.href;
</script>

<template>
  <template v-if="isLink(props)">
    <a :href="props.href" :target="props.target" :class="[classArray, classObject]">
      <MvIcon v-if="props.iconLeft" :name="props.iconLeft"></MvIcon>
      <slot>
        {{ props.label }}
      </slot>
      <MvIcon v-if="props.iconRight" :name="props.iconRight"></MvIcon>
      <MvSpinner v-if="props.loading"></MvSpinner>
    </a>
  </template>
  <template v-else>
    <button :class="[classArray, classObject]">
      <MvIcon v-if="props.iconLeft" :name="props.iconLeft"></MvIcon>
      <slot>
        {{ props.label }}
      </slot>
      <MvIcon v-if="props.iconRight" :name="props.iconRight"></MvIcon>
      <MvSpinner v-if="props.loading"></MvSpinner>
    </button>
  </template>
</template>
