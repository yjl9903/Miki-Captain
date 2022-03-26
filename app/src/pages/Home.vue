<script setup lang="ts">
import { computed, ref } from 'vue';
import format from 'date-fns/format';
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

import type { Record } from '../types';
import { data, useCurrent } from '../captain';
import CaptainList from '../components/CaptainList.vue';
import CaptainSummary from '../components/CaptainSummary.vue';

const mode = ref<'day' | 'sum'>('day');
const current = useCurrent();

const selectDate = computed({
  get() {
    return current.value.date;
  },
  set(d: Date) {
    const fmtDate = format(d, 'yyyy-MM-dd');
    for (const r of data) {
      if (format(r.date, 'yyyy-MM-dd') === fmtDate) {
        current.value = r;
        console.log(`[Captain] ${fmtDate}.csv`);
        return;
      }
    }
  }
});

const exportExcel = (record: Record) => {
  const fmtDate = format(record.date, 'yyyy年MM月dd日');
  const data =
    'data:text/plain;charset=utf-8,' +
    encodeURIComponent(
      'uid,username,type\n' +
        record.captains.map((r) => `${r.uid},${r.username},${r.type}`).join('\n')
    );
  const el = document.createElement('a');
  el.setAttribute('href', data);
  el.setAttribute('download', `${fmtDate}舰长日报.csv`);
  el.style.display = 'none';
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
};
</script>

<template>
  <div m="y-8" md="flex flex-row-reverse">
    <div lt-md="w-full mb-4" md="ml-8 flex-grow">
      <div p="4" rounded border-1 border="light-800">
        <div>
          <span font="bold">日期 </span>
          <span>{{ format(current.date, 'yyyy 年 M 月 d 日') }}</span>
        </div>
        <div mt="4">
          <c-button success @click="exportExcel(current)">导出 CSV</c-button>
          <c-button success @click="exportExcel(current)" ml="4">导出 Excel</c-button>
        </div>
        <div mt="4" pt="4" border border-0 border-t border-light-800>
          <DatePicker
            v-model="selectDate"
            :available-dates="{
              start: data[data.length - 1].date,
              end: data[0].date
            }"
          />
        </div>
        <div mt="4">
          <c-button @click="mode = mode === 'day' ? 'sum' : 'day'">
            {{ mode === 'day' ? '切换显示舰长总览' : '切换显示舰长日报' }}
          </c-button>
        </div>
      </div>
    </div>

    <div md="w-3/5" lt-md="w-full" v-if="mode === 'day'">
      <captain-list :list="current"></captain-list>
    </div>
    <div v-else md="w-3/5" lt-md="w-full">
      <captain-summary></captain-summary>
    </div>
  </div>
</template>

<style>
.face {
  border: 2px solid hsla(0, 0%, 100%, 0.4);
}

.list table th,
.list table td {
  @apply p-2 border border-light-800;
}
</style>
