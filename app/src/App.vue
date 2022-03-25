<script setup lang="ts">
import { up } from './captain';
</script>

<template>
  <img :src="up.space" alt="space" class="w-full" />
  <div px="8"><router-view></router-view></div>
</template>
