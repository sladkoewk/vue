<script setup lang="ts">
import { SpinnerType } from "./MvSpinnerType"

export interface SpinnerProps {
  type?: SpinnerType;
  class?: string;
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  type: SpinnerType.CIRCLE
});
</script>

<template>
  <template v-if="props.type === SpinnerType.BOUNCE">
    <div :class="['sk-bounce', props.class]">
      <div class="sk-bounce-dot"></div>
      <div class="sk-bounce-dot"></div>
    </div>
  </template>
  <template v-if="props.type === SpinnerType.CHASE">
    <div :class="['sk-chase', props.class]">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
  </template>
  <template v-if="props.type === SpinnerType.WAVE">
    <div :class="['sk-wave', props.class]">
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
    </div>
  </template>
  <template v-if="props.type === SpinnerType.PULSE">
    <div :class="['sk-pulse', props.class]"></div>
  </template>
  <template v-if="props.type === SpinnerType.FLOW">
    <div :class="['sk-flow', props.class]">
      <div class="sk-flow-dot"></div>
      <div class="sk-flow-dot"></div>
      <div class="sk-flow-dot"></div>
    </div>
  </template>
  <template v-if="props.type === SpinnerType.SWING">
    <div :class="['sk-swing', props.class]">
      <div class="sk-swing-dot"></div>
      <div class="sk-swing-dot"></div>
    </div>
  </template>
  <template v-if="props.type === SpinnerType.CIRCLE">
    <div :class="['sk-circle', props.class]">
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
    </div>
  </template>
  <template v-if="props.type === SpinnerType.CIRCLE_FADE">
    <div :class="['sk-circle-fade', props.class]">
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
    </div>
  </template>
  <template v-if="props.type === SpinnerType.GRID">
    <div :class="['sk-grid', props.class]">
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
    </div>
  </template>
  <template v-if="props.type === SpinnerType.FOLD">
    <div :class="['sk-fold', props.class]">
      <div class="sk-fold-cube"></div>
      <div class="sk-fold-cube"></div>
      <div class="sk-fold-cube"></div>
      <div class="sk-fold-cube"></div>
    </div>
  </template>
  <template v-if="props.type === SpinnerType.WANDER">
    <div :class="['sk-wander', props.class]">
      <div class="sk-wander-cube"></div>
      <div class="sk-wander-cube"></div>
      <div class="sk-wander-cube"></div>
      <div class="sk-wander-cube"></div>
    </div>
  </template>
</template>
