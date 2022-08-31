<script setup lang="ts">
import format from 'date-fns/format';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useCurrent, findCurrent } from '../captain';

const route = useRoute();
const router = useRouter();
const current = useCurrent();
watch(
  () => route.params,
  (params) => {
    if (params.year && params.month && params.day) {
      const cur = findCurrent(+params.year, +params.month, +params.day);
      if (cur) {
        current.value = cur;
      } else {
        router.replace({ name: 'Record' });
      }
    }
  },
  { immediate: true }
);

const getGuardImg = (type: string) => {
  if (type === '总督') return '/guard-1.png';
  else if (type === '提督') return '/guard-2.png';
  else return '/guard-3.png';
};
</script>

<template>
  <div id="record" class="list" w="full" overflow="auto" lt-md="text-xs">
    <h2 mt="1">{{ format(current.date, 'yyyy 年 M 月 d 日') }} 舰长日报</h2>
    <table rounded border border-collapse w="full">
      <thead>
        <tr bg="light-300">
          <th text="center">#</th>
          <th>UID</th>
          <th>用户名</th>
          <th text="center">类型</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cap, index) in current.captains" :key="cap.uid">
          <td text="center" font-bold>{{ index + 1 }}</td>
          <td>{{ cap.uid }}</td>
          <td>
            <router-link :to="{ name: 'Captain', params: { user: cap.uid } }">{{
              cap.username
            }}</router-link>
          </td>
          <td text="center">
            <div flex="~" items-center justify-center>
              <img
                :src="getGuardImg(cap.type)"
                :alt="cap.type"
                class="h-[2em] lt-md:h-[1.5em] select-none mr1"
              />
              <span font-light w-8>{{ cap.type }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
