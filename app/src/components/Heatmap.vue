<script setup lang="ts">
import { ref, unref, computed, toRefs, onMounted, watch } from 'vue';

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const emit = defineEmits<{ (e: 'click', day: Date): void }>();

const getDay = (date: Date) => date.getDay() || 7;

function isDef<T>(object: T | undefined | null): object is T {
  return object !== undefined && object !== null;
}

function parseHeatMapDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const props = defineProps<{
  now?: Date;
  colors?: string[];
  getColor: (day: string) => number;
  getTooltip: (day: string) => string;
}>();

const DefaultColors = [
  'rgb(235,237,240)',
  'rgb(155,233,168)',
  'rgb(64,196,99)',
  'rgb(48,161,78)',
  'rgb(33,110,57)'
];
const { now: _now, colors: _colors, getColor, getTooltip } = toRefs(props);
const colors = computed(() => _colors?.value ?? DefaultColors);

const dayInWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const container = ref<HTMLElement | null>(null);
const items = ref<Array<{ el: any; week: number; day: number }>>(Array(53 * 7).fill(null));

const unitValue = computed(() => {
  if (container.value === null) {
    return 16;
  } else {
    return Math.max(container.value.clientWidth / 53 - 4.5, 16);
  }
});
const unit = computed(() => {
  return unitValue.value + 'px';
});
const fontScale = computed(() => {
  if (container.value === null) {
    return '1.0';
  } else {
    const unit = Math.max(container.value.clientWidth / 53 - 4.5, 16);
    return `scale(${Math.min(1.0, (unit - 4) / 12)})`;
  }
});

onMounted(() => {
  // auto scroll to right
  const el = container.value!;
  if (el.scrollLeft !== el.scrollWidth) {
    el.scrollTo(el.scrollWidth, 0);
  }
  if (isDef(getTooltip.value)) {
    for (const item of items.value) {
      if (!item) continue;
      const date = parseHeatMapDate(getDate.value(item.week, item.day));
      const content = getTooltip.value(date);
      tippy(item.el, { content });
    }
  }
});

const now = computed(() => {
  return unref(_now) ?? new Date();
});

watch(now, () => {
  if (isDef(getTooltip.value)) {
    for (const item of items.value) {
      if (!item) continue;
      const date = parseHeatMapDate(getDate.value(item.week, item.day));
      const content = getTooltip.value(date);
      if ('_tippy' in item.el) {
        item.el._tippy.setContent(content);
      } else {
        tippy(item.el, { content });
      }
    }
  }
});

const getDate = computed(() => (week: number, day: number, click = false) => {
  const offset = getDay(now.value) + 52 * 7 - ((week - 1) * 7 + day);
  const date = new Date(now.value.getTime() - offset * 1000 * 3600 * 24);
  if (click) {
    emit('click', date);
  }
  return date;
});

const displayMonth = computed(() => (week: number) => {
  const lastDay = getDate.value(week, 7);
  if (lastDay.getDate() <= 7 && lastDay.getTime() <= now.value.getTime()) {
    return [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ][lastDay.getMonth()];
  } else {
    return null;
  }
});

const getDayColor = computed(() => (week: number, day: number) => {
  const date = parseHeatMapDate(getDate.value(week, day));
  const color = Math.max(0, Math.min(colors.value.length - 1, getColor.value(date) ?? 0));
  return colors.value[color];
});
</script>

<template>
  <div class="flex justify-center select-none">
    <div class="relative" :style="{ width: 2 * unitValue + 'px' }">
      <div
        v-for="day in 7"
        :key="day"
        class="absolute flex items-center"
        :style="{
          height: unit,
          top: (unitValue + 4) * day + 2 + 'px',
          right: '4px'
        }"
      >
        <span
          class="inline-block h-full !align-middle"
          :style="{ fontSize: '12px', transform: fontScale }"
          >{{ dayInWeek[day - 1] }}</span
        >
      </div>
    </div>
    <div ref="container" class="mb-4 w-full text-left whitespace-nowrap pb-[4px] overflow-x-auto">
      <div
        v-for="week in 53"
        :key="week"
        class="inline-grid grid-rows-7 gap-[4px] ml-[4px]"
        :style="{ width: unit }"
      >
        <div
          :class="[!displayMonth(week) ? 'text-transparent' : '', 'relative']"
          :style="{ height: unit }"
        >
          <span class="inline-block absolute" :style="{ fontSize: '12px', transform: fontScale }">{{
            displayMonth(week) ?? '一'
          }}</span>
        </div>
        <div v-for="day in 7" :key="day" :style="{ height: unit }">
          <div
            v-show="week < 53 || day <= getDay(now)"
            class="w-full h-full rounded bg-[#ebedf0] border-[rgba(27,31,35,0.06)] cursor-pointer"
            @click="getDate(week, day, true)"
            :style="{ backgroundColor: getDayColor(week, day) }"
            :ref="(el) => el && (items[week * 7 + day] = { el, week, day })"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
