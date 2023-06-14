/*
 * @Author: cube-yj
 * @Date: 2023-06-14 22:40:30
 * @LastEditTime: 2023-06-14 23:02:06
 * @LastEditors: cube-yj
 * @Description: 
 * @FilePath: \Miki-Captain\app\vite.config.ts
 */
import * as path from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import Unocss from 'unocss/vite';
import {
  presetUno,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import Icons from 'unplugin-icons/vite';

import fetchCaptain from './plugin';

const ruid = 117906;

const roomid = 11306;

export default defineConfig({
  define: {
    __GITHUB_REPOSITORY__: JSON.stringify(process.env.GITHUB_REPOSITORY),
    __BUILD_TIME__: `"${new Date().toISOString()}"`
  },
  plugins: [
    vue(),
    Icons(),
    Unocss({
      presets: [presetUno(), presetAttributify()],
      transformers: [transformerDirectives(), transformerVariantGroup()]
    }),
    fetchCaptain({
      data: path.join(__dirname, '../data'),
      roomid,
      ruid,
      gift: { name: '毛线毛裤' }
    })
  ],
  build: {
    outDir: path.join(__dirname, '../dist')
  }
});
