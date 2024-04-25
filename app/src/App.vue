<script setup lang="ts">
import { provide, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import format from 'date-fns/format';

import IconClose from '~icons/mdi/close';
import IconGithub from '~icons/mdi/github';
import IconSearch from '~icons/ic/baseline-search';

import { CURRENT, data, up, findCurrent } from './captain';

const route = useRoute();
const router = useRouter();

const buildTime = format(new Date(__BUILD_TIME__), 'yyyy-MM-dd HH:mm');

const githubRepo = __GITHUB_REPOSITORY__;

const current = ref(data[0]);
provide(CURRENT, current);

// search
const searchInput = ref('');
const search = (search: string) => {
  {
    const match = /(\d+)[-.年](\d+)[-.月](\d+)/.exec(search);
    if (match) {
      const cur = findCurrent(+match[1], +match[2], +match[3]);
      if (cur) {
        current.value = cur;
        router.push({
          name: 'RecordDay',
          params: { year: match[1], month: match[2], day: match[3] }
        });
        searchInput.value = '';
        return;
      }
    }
  }
  {
    const match = /(\d+)[-.月](\d+)/.exec(search);
    if (match) {
      const cur = findCurrent(new Date().getFullYear(), +match[1], +match[2]);
      if (cur) {
        current.value = cur;
        router.push({
          name: 'RecordDay',
          params: { year: '' + new Date().getFullYear(), month: match[1], day: match[2] }
        });
        searchInput.value = '';
        return;
      }
    }
  }
  if (search === 'sum' || search === 'summary' || search.indexOf('总') !== -1) {
    router.push({ name: 'Summary' });
    searchInput.value = '';
    return;
  }
  if (/\d+/.test(search)) {
    router.push({ name: 'Captain', params: { user: /\d+/.exec(search)![0] } });
    searchInput.value = '';
    return;
  } else {
    router.push({ name: 'Captain', params: { user: search.trim() } });
    searchInput.value = '';
    return;
  }
};
</script>

<template>
  <img :src="up.space" alt="space" class="w-full" />
  <div
    id="vup-info"
    mt="4"
    mx="8"
    px="4"
    py="4"
    md="h-24 flex"
    items="center"
    justify="between"
    rounded
    border="~ solid 1 light-800"
  >
    <div flex class="md:h-full">
      <a :href="`https://space.bilibili.com/${up.mid}`" target="_blank" class="block md:h-full">
        <img class="lt-md:h-24 md:h-full" rounded="full" :src="up.face" alt="face" />
      </a>
      <div h="full" ml="4">
        <div flex items="end" h="50%" text="2xl">
          <a
            :href="`https://space.bilibili.com/${up.mid}`"
            target="_blank"
            class="text-$text-light-1 hover:text-$text-light-2"
            >{{ up.name }}</a
          >
        </div>
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

  <div px-8>
    <div w="full" my-8 flex justify="between">
      <div class="relative" flex-grow>
        <IconSearch class="absolute text-xl icon-search" />
        <input
          type="text"
          name="contest_search"
          id="contest_search"
          autocomplete="off"
          class="input-search w-[calc(100%-4rem)] text-base align-baseline py-2 pr-6 rounded-md outline-none lt-md:shadow-box border border-solid border-light-900 focus:border-gray-500"
          placeholder="UID 用户名 日期 (3.12)..."
          v-model="searchInput"
          @keypress.enter="search(searchInput)"
        />
        <IconClose
          @click="searchInput = ''"
          class="absolute text-xl p-1 icon-close text-gray-400 outline-transparent rounded-full focus:bg-light-400"
        />
      </div>
      <div class="ml-2">
        <c-button
          info
          class="h-full"
          @click="
            route.name === 'Summary'
              ? router.push({ name: 'Record' })
              : router.push({ name: 'Summary' })
          "
          >{{ route.name === 'Summary' ? '舰长日报' : '舰长总览' }}</c-button
        >
      </div>
    </div>
  </div>

  <div px-8><router-view></router-view></div>

  <footer>
    <div class="text-center text-gray-400 pt-4">
      <div mb="4">
        <span>构建时间</span>
        <span font="mono">: {{ buildTime }}</span>
      </div>
      <div m="b-12">
        <div v-if="!!githubRepo" class="flex items-center justify-center my-2 font-mono">
          <a
            class="text-$text-light-1 mr-1"
            :href="`https://github.com/${githubRepo}`"
            target="_blank"
            ><icon-github class="align-middle"
          /></a>
          <a class="block text-left" :href="`https://github.com/${githubRepo}`" target="_blank">
            {{ githubRepo }}</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
