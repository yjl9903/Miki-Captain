import * as core from '@actions/core';
import axios from 'axios';
import format from 'date-fns/format';
import { writeFileSync } from 'fs';

import { toCSV } from './output';
import { User } from './types';

class Client {
  private readonly roomid: string;
  private readonly ruid: string;

  constructor(roomid: string, ruid: string) {
    this.roomid = roomid;
    this.ruid = ruid;
  }

  private async fetch(page: number): Promise<User[]> {
    try {
      const { data } = await axios.get('https://api.live.bilibili.com/guard/topList', {
        params: {
          roomid: this.roomid,
          ruid: this.ruid,
          page
        }
      });
      if (page === 1) {
        return [...data.data.top3, ...data.data.list];
      } else {
        return data.data.list;
      }
    } catch (error: unknown) {
      core.setFailed(error as any);
      process.exit(1);
    }
  }

  async get(): Promise<User[]> {
    const ans = [];
    for (let i = 1; ; i++) {
      const res = await this.fetch(i);
      if (res.length === 0) {
        break;
      }
      ans.push(...res);
    }
    return ans.map((u) => ({ uid: u.uid, username: u.username }));
  }
}

function today(): string {
  const date = new Date();
  return format(date, 'yyyy-MM-dd');
}

async function run(): Promise<void> {
  const roomid = core.getInput('roomid');
  const ruid = core.getInput('ruid');
  const client = new Client(roomid, ruid);

  const list = await client.get();

  {
    const csvname = `${today()}.csv`;
    const content = toCSV(list);
    writeFileSync(csvname, content, 'utf-8');
  }

  {
    let cnt = 1;
    for (const user of list) {
      core.info(`${cnt++}. ${user.username} (uid: ${user.uid})`);
    }
  }
}

run();
