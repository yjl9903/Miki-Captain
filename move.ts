import fs from 'fs/promises';
import path from 'path';

async function main() {
  const files = await fs.readdir('data');

  for (const file of files) {
    const match = /(\d+)-(\d+)-(\d+)\.csv/.exec(file)!;
    if (!match) continue;

    const year = match[1];
    const month = match[2];
    const date = match[3];

    const target = `data/${year}/${month}/${date}.csv`;
    await fs.mkdir(path.dirname(target), { recursive: true }).catch(() => {});
    await fs.rename(`data/${file}`, target);
  }
}

main();
