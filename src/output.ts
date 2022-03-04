import { User } from './types';

export function toCSV(list: User[]): string {
  const text = ['uid,username'];
  for (const user of list) {
    text.push(`${user.uid},${user.username}`);
  }
  return text.join('\n');
}
