<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import format from 'date-fns/format';
import random from 'random';

import { useCurrent, gift } from '../captain';

const current = useCurrent();

const username = ref('');
const restUsers = ref([...current.value.captains]);
const logs = ref<any[]>([]);

if (window.localStorage.getItem('username')) {
  username.value = window.localStorage.getItem('username')!;
}
const reset = () => {
  restUsers.value = [...current.value.captains];
  logs.value = [];
};
watch(current, () => {
  reset();
});
watch(username, (username) => {
  window.localStorage.setItem('username', username);
  reset();
});

const roll = () => {
  if (logs.value.length > 0 && logs.value[logs.value.length - 1].username === username.value) {
    reset();
  }
  for (let i = 0; i < 10; i++) {
    const rd = random.uniformInt(0, restUsers.value.length - 1);
    const id = rd();
    const user = restUsers.value[id];
    logs.value.push(user);
    if (user.username === username.value) {
      break;
    }
    restUsers.value.splice(id, 1);
  }
};

const tenP = computed(() => {
  const len = restUsers.value.length;
  if (len <= 10) {
    return '100.00';
  } else {
    let prod = 1.0;
    for (let i = 0; i < 10; i++) {
      prod *= 1.0 - 1.0 / (len - i);
    }
    return (100 * (1.0 - prod)).toFixed(2);
  }
});
</script>

<template>
  <div class="list" w="full">
    <h2 mt="0" pb="4" border-b border-0 border-light-800>
      {{ format(current.date, 'yyyy 年 M 月 d 日') }} 舰长抽奖
    </h2>
    <div v-if="gift" text="center">
      <div text="center" px="12" pb="4" inline-block border border-light-800 bg-light-100 rounded>
        <h3>奖品</h3>
        <h3>{{ gift.name }}</h3>
        <div mt="4">
          <c-button success @click="roll">十连</c-button>
        </div>
      </div>
    </div>
    <div mt="8">
      <span font="bold">你的用户名</span>
      <input
        type="text"
        name="contest_search"
        id="contest_search"
        class="p-2 ml-2 rounded-md outline-none <md:shadow-box border border-light-900"
        v-model="username"
      />
    </div>
    <div mt="4">
      <span font="bold">单抽中奖率</span>
      <span ml="2">{{ (100 / restUsers.length).toFixed(2) }} %</span>
      <span> (剩余 {{ restUsers.length }} 位舰长)</span>
    </div>
    <div mt="4">
      <span font="bold">十连中奖率</span>
      <span ml="2">{{ tenP }} %</span>
    </div>
    <div mt="4">
      <div v-if="logs.length" border border-light-800 rounded py-1>
        <div
          v-for="(log, idx) in logs.slice(0).reverse()"
          :key="log.uid"
          p-2
          :class="['border-0', 'border-light-800', idx + 1 < logs.length && 'border-b']"
        >
          <span font="bold mono" inline-block text="center" w="8">{{ logs.length - idx }}</span>
          <span ml="2">{{ log.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
