<script setup lang="ts">
import { data, up } from '../captain';
import format from 'date-fns/format';
</script>

<template>
  <!-- <h1 m="t-0">{{ up.name }} 的舰团</h1> -->
  <div
    h="24"
    px="2"
    py="4"
    flex
    items="center"
    justify="between"
    border-0
    border-b
    border="gray-400"
  >
    <div flex h="full">
      <div h="full">
        <img h="full" rounded="full" class="face" :src="up.face" alt="face" />
      </div>
      <div h="full" ml="2">
        <div flex items="end" h="50%" text="2xl">{{ up.name }}</div>
        <div flex items="start" h="50%" mt="2" text="sm" font="light">{{ up.sign }}</div>
      </div>
    </div>
    <div>
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
