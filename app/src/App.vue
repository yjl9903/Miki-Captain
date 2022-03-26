<script setup lang="ts">
import format from 'date-fns/format';
import IconGithub from '~icons/mdi/github';

import { up } from './captain';

const buildTime = format(new Date(__BUILD_TIME__), 'yyyy-MM-dd HH:mm');

const githubRepo = __GITHUB_REPOSITORY__;
</script>

<template>
  <img :src="up.space" alt="space" class="w-full" />
  <div px="8"><router-view></router-view></div>
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
