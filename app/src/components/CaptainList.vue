<script setup lang="ts">
import format from 'date-fns/format';

import type { Record } from '../types';

defineProps<{ list: Record }>();
</script>

<template>
  <div class="list" w="full" overflow="auto">
    <h2 mt="0">{{ format(list.date, 'yyyy 年 M 月 d 日') }} 舰长日报</h2>
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
        <tr v-for="(cap, index) in list.captains" :key="cap.uid">
          <td text="center">{{ index + 1 }}</td>
          <td>{{ cap.uid }}</td>
          <td>
            <a :href="`https://space.bilibili.com/${cap.uid}`" target="_blank">{{
              cap.username
            }}</a>
          </td>
          <td text="center">{{ cap.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
