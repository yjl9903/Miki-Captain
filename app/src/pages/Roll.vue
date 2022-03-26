<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import format from 'date-fns/format';
import random from 'random';
import { Fireworks } from 'fireworks-js';

import { useCurrent, gift } from '../captain';

const current = useCurrent();

const username = ref('');
const restUsers = ref([...current.value.captains]);
const logs = ref<any[]>([]);
const _fw = ref();

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

let timestamp: number;
let fireworks: Fireworks | undefined = undefined;
const roll = () => {
  if (timestamp && new Date().getTime() - timestamp < 3000) {
    return;
  }
  if (restUsers.value.length === 0) {
    reset();
  }
  if (logs.value.length > 0 && logs.value[logs.value.length - 1].username === username.value) {
    reset();
  }
  for (let i = 0; i < 10 && restUsers.value.length > 0; i++) {
    const rd = random.uniformInt(0, restUsers.value.length - 1);
    const id = rd();
    const user = restUsers.value[id];
    logs.value.push(user);
    if (user.username === username.value) {
      if (!fireworks && _fw.value) {
        fireworks = new Fireworks(_fw.value, { delay: { min: 5, max: 15 } });
      }
      timestamp = new Date().getTime();
      fireworks?.start();
      setTimeout(() => fireworks?.stop(), 3000);
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
  <div id="roll" w="full">
    <h2 mt="0" pb="4" border-b border-0 border-light-800>
      {{ format(current.date, 'yyyy 年 M 月 d 日') }} 舰长抽奖
    </h2>
    <div v-if="gift" relative text="center">
      <div
        class="-z-3"
        text="center"
        px="12"
        pb="4"
        inline-block
        border
        border-light-800
        bg-light-100
        rounded
      >
        <h3>奖品</h3>
        <h3>{{ gift.name }}</h3>
        <div mt="4">
          <div class="button !border-0" @click="roll">
            <a>十连</a>
          </div>
        </div>
      </div>
    </div>
    <div relative>
      <div
        v-if="!!current.captains.find((c) => c.username === username)"
        absolute
        top="-24"
        left="0"
        class="-z-1"
        max-h="100"
        h="full"
        w="full"
        ref="_fw"
      ></div>
      <div mt="16">
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
            <span ml="2" :class="[log.username === username && 'text-green-400 font-bold']">{{
              log.username
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#roll .button {
  position: relative;
  display: inline-block;
  margin: 20px;
}

#roll .button a {
  color: white;
  font-weight: bold;
  @apply text-2xl py-4 px-8;
  text-align: center;
  text-decoration: none;
  background-color: #ffa12b;
  display: block;
  position: relative;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-shadow: 0px 1px 0px #000;
  filter: dropshadow(color=#000, offx=0px, offy=1px);

  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 10px 0 #915100;
  -moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 10px 0 #915100;
  box-shadow: inset 0 1px 0 #ffe5c4, 0 10px 0 #915100;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

#roll .button a:active {
  top: 10px;
  background-color: #f78900;

  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;
  -moz-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3pxpx 0 #915100;
  box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;
}

#roll .button:after {
  content: '';
  height: 100%;
  width: 100%;
  padding: 4px;
  position: absolute;
  bottom: -15px;
  left: -4px;
  z-index: -1;
  background-color: #2b1800;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
</style>
