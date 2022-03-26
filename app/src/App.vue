<script setup lang="ts">
import format from 'date-fns/format';
import { up } from './captain';

const buildTime = format(new Date(__BUILD_TIME__), 'yyyy-MM-dd HH:mm');
</script>

<template>
  <img :src="up.space" alt="space" class="w-full" />
  <div px="8"><router-view></router-view></div>
  <div class="text-center text-gray-400 pt-4">
    <div mb="8">
      <span>构建时间</span>
      <span font="mono">: {{ buildTime }}</span>
    </div>
  </div>
</template>
