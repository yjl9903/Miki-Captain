<script setup lang="ts">
import { data, up } from '../captain';
import format from 'date-fns/format';
</script>

<template>
  <!-- <h1 m="t-0">{{ up.name }} 的舰团</h1> -->
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

  <div m="t-4">
    <div v-for="t in data">{{ format(t.date, 'yyyy-MM-dd') }}</div>
  </div>
</template>

<style>
.face {
  border: 2px solid hsla(0, 0%, 100%, 0.4);
}
</style>
