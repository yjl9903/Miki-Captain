import * as path from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import Unocss from 'unocss/vite';
import Icons from 'unplugin-icons/vite';

import fetchCaptain from './plugin';

const ruid = +(process.env.RUID ?? 477317922);

const roomid = +(process.env.ROOM_ID ?? 21672023);

export default defineConfig({
  define: {
    __GITHUB_REPOSITORY__: JSON.stringify(process.env.GITHUB_REPOSITORY),
    __BUILD_TIME__: `"${new Date().toISOString()}"`
  },
  plugins: [
    vue(),
    Icons(),
    Unocss(),
    fetchCaptain({
      data: path.join(__dirname, '../data'),
      roomid,
      ruid,
      gift: { name: '毛线毛裤' }
    })
  ],
  build: {
    emptyOutDir: true,
    outDir: path.join(__dirname, '../dist')
  }
});
