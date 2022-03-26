<script setup lang="ts">
import { captains } from '../captain';
</script>

<template>
  <div id="summary" class="list" w="full" overflow="auto">
    <h2 mt="1">舰长总览</h2>
    <table rounded border border-collapse w="full">
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
            <router-link :to="{ name: 'Captain', params: { user: cap.uid } }">{{
              cap.username
            }}</router-link>
          </td>
          <td text="center">{{ cap.length }}</td>
          <td text="center">{{ cap.months.size }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
