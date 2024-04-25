<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Heatmap from '../components/Heatmap.vue';
import { captains, captainSet, up } from '../captain';

const route = useRoute();
const router = useRouter();
const captain = ref<(typeof captains)[0]>();

watch(
  () => route.params,
  (params) => {
    const user = Array.isArray(params.user) ? params.user[0] : params.user;
    if (/\d/.test(user)) {
      // @ts-ignore
      captain.value = captainSet.get(user) || captainSet.get(+user);
    } else {
      for (const cap of captains) {
        if (cap.username === user) {
          captain.value = cap;
        }
      }
      if (!captain.value) {
        for (const cap of captains) {
          if (cap.username.indexOf(user) !== -1) {
            captain.value = cap;
          }
        }
      }
    }
    if (!captain.value) {
      router.push({ name: 'Record' });
    }
  },
  { immediate: true }
);

const heatmapNow = ref(new Date());
const handleHeatMapColor = (day: string) => {
  const count = captain.value?.days.has(day) ? 1 : 0;
  return count;
};
const handleHeatMapTooltip = (day: string) => {
  return `${day}`;
};
const handleClick = (date: Date) => {
  router.push({
    name: 'RecordDay',
    params: {
      year: '' + date.getFullYear(),
      month: '' + (date.getMonth() + 1),
      day: '' + date.getDate()
    }
  });
};
</script>

<template>
  <div v-if="captain">
    <h2>
      <a :href="`https://space.bilibili.com/${captain.uid}`">{{ captain.username }}</a>
    </h2>
    <p>陪伴了 {{ up.name }} {{ captain.accompany ?? captain.length }} 天。</p>
    <Heatmap
      @click="handleClick"
      :now="heatmapNow"
      :getColor="handleHeatMapColor"
      :getTooltip="handleHeatMapTooltip"
    ></Heatmap>
  </div>
</template>
