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

  gift?: {
    name: string;
  };
}

export default function fetchCaptain(option: Option): Plugin[] {
  return [
    {
      name: 'captain',
      resolveId(id) {
        if (id === '~captain') {
          return 'captain.json';
        }
      },
      async load(id) {
        if (id === 'captain.json') {
          const data = loadCaptain(option.data);
          const up = await loadUp(option.ruid);
          return JSON.stringify({ data, up, gift: option.gift }, null, 2);
        }
      },
      async transformIndexHtml(html) {
        const ctx = { face: '/favicon' };
        const up = await loadUp(option.ruid, ctx);
        return html
          .replace('/favicon.ico', ctx.face)
          .replace('<%- title -%>', `${up.name} 舰长日报`);
      }
    }
  ];
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
  // @ts-ignore
  return data.sort((lhs, rhs) => rhs.date.localeCompare(lhs.date));
}

export async function loadUp(uid: number, option = { face: '' }) {
  const {
    data: { data }
  } = await axios.get(`http://api.bilibili.com/x/web-interface/card?photo=true&mid=${uid}`);
  const card = data.card;
  delete data.card;
  data.space = await transformBase64Image(data.space.l_img);
  if (option.face) {
    option.face += '.' + (card.face.endsWith('.png') ? 'png' : 'jpeg');
  }
  card.face = await transformBase64Image(card.face, option.face);
  return { ...card, ...data };
}

async function transformBase64Image(url: string, filename?: string) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  });
  const fmt = url.endsWith('.png') ? 'png' : 'jpeg';
  if (filename) {
    fs.writeFileSync(
      path.join(__dirname, 'public', filename),
      Buffer.from(response.data, 'binary')
    );
  }
  return `data:image/${fmt};base64,` + Buffer.from(response.data, 'binary').toString('base64');
}
