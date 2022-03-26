<script setup lang="ts">
import { computed, ref } from 'vue';
import format from 'date-fns/format';
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

import type { Record } from '../types';
import { data, up } from '../captain';
import CaptainList from '../components/CaptainList.vue';
import CaptainSummary from '../components/CaptainSummary.vue';

const mode = ref<'day' | 'sum'>('day');
const current = ref(data[0]);

const marked = ref(data.map((r) => ({ dot: true, highlight: false, dates: r.date, raw: r })));
const selectRef = ref(marked.value[0]);
selectRef.value.dot = false;
selectRef.value.highlight = true;
const selectDate = computed({
  get() {
    return current.value.date;
  },
  set(d: Date) {
    const fmtDate = format(d, 'yyyy-MM-dd');
    for (const r of marked.value) {
      selectRef.value.dot = true;
      selectRef.value.highlight = false;
      if (format(r.dates, 'yyyy-MM-dd') === fmtDate) {
        r.dot = false;
        r.highlight = true;
        current.value = r.raw;
        selectRef.value = r;
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
      <a :href="`https://space.bilibili.com/${up.mid}`" class="block md:h-full" target="_blank">
        <img class="lt-md:h-24 md:h-full" rounded="full" :src="up.face" alt="face" />
      </a>
      <div h="full" ml="2">
        <div flex items="end" h="50%" text="2xl">{{ up.name }}</div>
        <div flex items="start" h="50%" mt="2" text="sm" font="light">{{ up.sign }}</div>
      </div>
    </div>
    <div lt-md="mt-4" flex justify="around">
      <div h="full" text="center">
        <div h="50%">粉丝数</div>
        <div h="50%" mt="2" font="light">{{ up.fans }}</div>
      </div>
      <div h="full" text="center" ml="4">
        <div h="50%">舰团</div>
        <div h="50%" mt="2" font="light">{{ current.captains.length }}</div>
      </div>
    </div>
  </div>

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
          <DatePicker v-model="selectDate" :attributes="marked" />
        </div>
        <div mt="4">
          <c-button @click="mode = mode === 'day' ? 'sum' : 'day'">
            {{ mode === 'day' ? '切换显示天数总览' : '切换显示舰长日报' }}
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
