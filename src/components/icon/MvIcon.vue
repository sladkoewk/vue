<script setup lang="ts">
import { Size, TextColor } from "../../styles/styles"

export interface IconProps {
  size?: Size;
  color?: TextColor;
  name: String;
}

const props = withDefaults(defineProps<IconProps>(), {
  size: Size.M,
  color: TextColor.ACCENT,
});
</script>


<template>
  <span class="material-symbols-outlined" :class="[
    props.size
    , props.color]
  ">{{ name }}</span>
</template>
