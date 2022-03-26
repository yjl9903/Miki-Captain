<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import format from 'date-fns/format';
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

import type { Record } from '../types';
import { data, useCurrent } from '../captain';

const router = useRouter();

const current = useCurrent();
const mode = ref<'day' | 'sum'>('day');
watch(mode, (mode) => {
  if (mode === 'day') {
    router.push({ name: 'Record' });
  } else {
    router.push({ name: 'Summary' });
  }
});

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
            :attributes="[{ dates: current.date, highlight: true }]"
            @click="mode = 'day'"
          />
        </div>
      </div>
    </div>

    <div md="w-3/5" lt-md="w-full">
      <router-view></router-view>
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

.icon-search {
  top: 50%;
  transform: translate(0.5rem, -50%);
}
.icon-close {
  top: 50%;
  right: 0.5rem;
  transform: translate(0rem, -50%);
}
.input-search {
  padding-left: calc(1.25rem + 1em);
}
@media (any-hover: hover) {
  .icon-close:hover {
    @apply cursor-pointer bg-light-400;
  }
}
</style>
