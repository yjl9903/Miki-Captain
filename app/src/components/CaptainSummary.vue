<script setup lang="ts">
import { computed, ref } from 'vue';

import { data } from '../captain';

const captainSet = ref<Map<number, { uid: number , username: string; length: number }>>(new Map());
for (const record of data) {
  for (const user of record.captains) {
    if (captainSet.value.get(user.uid)) {
      captainSet.value.get(user.uid)!.length++;
    } else {
      captainSet.value.set(user.uid, { uid: user.uid, username: user.username, length: 1 });
    }
  }
};
const captains = computed(() => {
  return [...captainSet.value.values()].sort((lhs, rhs) => rhs.length - lhs.length);
});
</script>

<template>
  <div class="list" w="full" overflow="auto">
    <table rounded border border-collapse>
      <thead>
        <tr bg="light-300">
          <th text="center">#</th>
          <th>UID</th>
          <th>用户名</th>
          <th text="center">天数</th>
          <th text="center">月份</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cap, index) in captains" :key="cap.uid">
          <td text="center">{{ index + 1 }}</td>
          <td>{{ cap.uid }}</td>
          <td>
            <a :href="`https://space.bilibili.com/${cap.uid}`" target="_blank">{{
              cap.username
            }}</a>
          </td>
          <td text="center">{{ cap.length }}</td>
          <td text="center">1</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.list table th,
.list table td {
  @apply p-2 border border-light-800;
}
</style>
