import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Unocss from "unocss/vite";
import {
  presetUno,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    vue(),
    Icons(),
    Unocss({
      presets: [presetUno(), presetAttributify()],
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),
  ],
  build: {
    outDir: path.join(__dirname, "../dist"),
  },
});
