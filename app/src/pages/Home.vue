<script setup lang="ts">
import { ref } from 'vue';

import { data, up } from '../captain';
import CaptainList from '../components/CaptainList.vue';

const current = ref(data[0]);
</script>

<template>
  <div
    mt="4"
    px="4"
    py="4"
    md="h-24 flex"
    items="center"
    justify="between"
    rounded
    border-1
    border="light-800"
  >
    <div flex class="md:h-full">
      <div class="md:h-full">
        <img class="lt-md:h-24 md:h-full" rounded="full" :src="up.face" alt="face" />
      </div>
      <div h="full" ml="2">
        <div flex items="end" h="50%" text="2xl">{{ up.name }}</div>
        <div flex items="start" h="50%" mt="2" text="sm" font="light">{{ up.sign }}</div>
      </div>
    </div>
    <div lt-md="mt-4">
      <div h="full" text="center">
        <div h="50%">粉丝数</div>
        <div h="50%" mt="2" font="light">{{ up.fans }}</div>
      </div>
    </div>
  </div>

  <div m="y-4">
    <captain-list :list="current"></captain-list>
  </div>
</template>

<style>
.face {
  border: 2px solid hsla(0, 0%, 100%, 0.4);
}
</style>
