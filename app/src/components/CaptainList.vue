<script setup lang="ts">
import { ref } from 'vue';

import type { Record } from '../types';

defineProps<{ list: Record }>();
</script>

<template>
  <table>
    <thead>
      <th>#</th>
      <th>UID</th>
      <th>用户名</th>
      <th>类型</th>
    </thead>
    <tbody>
      <tr v-for="(cap, index) in list.captains" :key="cap.uid">
        <td>{{ index + 1 }}</td>
        <td>{{ cap.uid }}</td>
        <td>{{ cap.username }}</td>
        <td>{{ cap.type }}</td>
      </tr>
    </tbody>
  </table>
</template>
