import captain from '~captain';

import type { Record, UpInfo } from './types';

export const data: Record[] = captain.data;
for (const r of data) {
  r.date = new Date(r.date);
}

export const up: UpInfo = captain.up;
