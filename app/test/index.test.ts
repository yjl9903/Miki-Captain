import path from 'path';
import { describe, it, expect } from 'vitest';

import { loadCaptain } from '../plugin';

describe('plugin', () => {
  it('load', () => {
    expect(loadCaptain(path.join(__dirname, '../../data'))).toBeInstanceOf(Array);
  });
});
