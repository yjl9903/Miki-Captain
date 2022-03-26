<script setup lang="ts">
import { ref } from 'vue';
import format from 'date-fns/format';

import { useCurrent } from '../captain';

const current = useCurrent();
</script>

<template>
  <div class="list" w="full" overflow="auto">
    <h2 mt="0">{{ format(current.date, 'yyyy 年 M 月 d 日') }} 舰长抽奖</h2>
  </div>
</template>
