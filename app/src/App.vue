<script setup lang="ts">
import { data } from '~captain';
import format from 'date-fns/format';
</script>

<template>
  <h1>Miki's Captain</h1>
  <div v-for="t in data">{{ format(t.date, 'yyyy-MM-dd') }}</div>
</template>
