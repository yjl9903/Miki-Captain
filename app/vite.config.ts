import path from 'path';

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

export default defineConfig({
  define: {
    __BUILD_TIME__: `"${new Date().toISOString()}"`
  },
  plugins: [
    vue(),
    Icons(),
    Unocss({
      presets: [presetUno(), presetAttributify()],
      transformers: [transformerDirectives(), transformerVariantGroup()]
    }),
    fetchCaptain({ data: path.join(__dirname, '../data'), roomid: 21672023, ruid: 477317922 })
  ],
  build: {
    outDir: path.join(__dirname, '../dist')
  }
});
