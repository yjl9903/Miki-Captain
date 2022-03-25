<script setup lang="ts">
import { data, up } from '../captain';
import format from 'date-fns/format';
</script>

<template>
  <img :src="up.space" alt="space" class="w-full" />
  <h1 m="t-0">{{ up.name }} 的舰团</h1>
  <div v-for="t in data">{{ format(t.date, 'yyyy-MM-dd') }}</div>
</template>
