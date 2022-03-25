import type { Plugin } from 'vite';

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { parse } from 'csv-parse/sync';

import type { Record } from './src/types';

interface Option {
  data: string;

  roomid: number;

  ruid: number;
}

export default function fetchCaptain(option: Option): Plugin {
  return {
    name: 'captain',
    resolveId(id) {
      if (id === '~captain') {
        return 'captain.js';
      }
    },
    async load(id) {
      if (id === 'captain.js') {
        const records = loadCaptain(option.data);
        const up = await loadUp(option.ruid);
        const data = [
          `export const data = ${JSON.stringify(records, null, 2)};`,
          `for (const r of data) { r.date = new Date(r.date); }`,
          `export const up = ${JSON.stringify(up, null, 2)};`
        ].join('\n');
        return data;
      }
    }
  };
}

export function loadCaptain(root: string): Record[] {
  const data: Record[] = [];
  for (const filename of fs.readdirSync(root)) {
    const match = /^(\d+)-(\d+)-(\d+)\.csv$/.exec(filename);
    if (match) {
      const captains = parse(fs.readFileSync(path.join(root, filename), 'utf-8'), {
        encoding: 'utf-8',
        columns: true,
        skip_empty_lines: true,
        trim: true
      });
      const date = new Date(+match[1], +match[2] - 1, +match[3], 2, 0, 0, 0).toISOString();
      // @ts-ignore
      data.push({ date, captains });
    }
  }
  return data;
}

export async function loadUp(uid: number) {
  const {
    data: { data }
  } = await axios.get(`http://api.bilibili.com/x/web-interface/card?photo=true&mid=${uid}`);
  const card = data.card;
  delete data.card;
  data.space = await transformBase64Image(data.space.l_img);
  return { ...card, ...data };
}

async function transformBase64Image(url: string) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  });
  return `data:image/png;base64,` + Buffer.from(response.data, 'binary').toString('base64');
}
