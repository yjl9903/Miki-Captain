import { inject, Ref } from 'vue';
import format from 'date-fns/format';

import captain from '~captain';

import type { Record, UpInfo } from './types';

export const data: Record[] = captain.data;
for (const r of data) {
  r.date = new Date(r.date);
}

export const up: UpInfo = captain.up;

export const CURRENT = Symbol('current');

export function useCurrent(): Ref<Record> {
  return inject<Ref<Record>>(CURRENT)!;
}

export function findCurrent(year: number, month: number, day: number) {
  const d = `${year}-${month}-${day}`;
  for (const r of data) {
    if (d === format(r.date, 'yyyy-MM-dd') || d === format(r.date, 'yyyy-M-d')) {
      return r;
    }
  }
}
