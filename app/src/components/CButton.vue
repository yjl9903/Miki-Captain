<template>
  <button
    :class="[
      'inline-flex',
      'justify-center',
      'items-center',
      'button',
      colorClass,
      padding || 'px-3 py-2',
      !disable || 'disable'
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
const props = defineProps<{
  disable?: boolean;
  padding?: string;
  primary?: boolean;
  info?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
}>();
const { primary, info, success, warning, danger } = toRefs(props);
const colorClass = computed(() =>
  primary?.value
    ? 'is-primary'
    : info?.value
    ? 'is-info'
    : success?.value
    ? 'is-success'
    : warning?.value
    ? 'is-warning'
    : danger?.value
    ? 'is-danger'
    : undefined
);
</script>

<style>
.button {
  @apply rounded border border-1 border-[#dbdbdb] !outline-none;
  @apply cursor-pointer select-none;
}
.button:not(.disable) {
  @apply hover:border-[#b5b5b5];
  @apply focus:shadow;
}
.button.disable {
  @apply cursor-not-allowed;
  @apply text-gray-400;
}
.button.is-success,
.button.is-primary {
  @apply border-transparent bg-[#48c78e] text-white;
}

.button.is-success:not(.disable),
.button.is-primary:not(.disable) {
  @apply hover:bg-[#3ec487];
}
.button.is-success:not(.disable):focus,
.button.is-primary:not(.disable):focus {
  box-shadow: 0 0 0 0.125em rgb(72 199 142 / 25%);
}

.button.is-info {
  @apply border-transparent text-white bg-[#209cee];
}
.button.is-info:not(.disable) {
  @apply hover:bg-[#1496ed];
}
.button.is-info:not(.disable):focus {
  box-shadow: 0 0 0 0.125em rgb(32 156 238 / 25%);
}

.button.is-warning {
  @apply border-transparent bg-[#ffe08a];
}
.button.is-warning:not(.disable) {
  @apply hover:bg-[#ffdc7d];
}
.button.is-warning:not(.disable):focus {
  box-shadow: 0 0 0 0.125em rgb(255 224 138 / 25%);
}

.button.is-danger {
  @apply border-transparent text-white bg-[#f14668];
}
.button.is-danger:not(.disable) {
  @apply hover:bg-[#f03a5f];
}
.button.is-danger:not(.disable):focus {
  box-shadow: 0 0 0 0.125em rgb(241 70 104 / 25%);
}
</style>
