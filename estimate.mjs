import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

const data = JSON.parse(readFileSync(new URL('./hardware.json', import.meta.url), 'utf8'));
const { values } = parseArgs({ options: Object.fromEntries(
  ['gpu', 'cpu', 'ram', 'resolution', 'preset'].map(name => [name, { type: 'string' }])
) });

function lookup(key, table) {
  const value = values[key];
  if (!Object.hasOwn(table, value)) {
    throw new Error(`Choose --${key} from: ${Object.keys(table).join(', ')}`);
  }
  return table[value];
}

const scale = lookup('resolution', data.resolutions) * lookup('preset', data.presets);
const graphics = data.gpuBands[lookup('gpu', data.gpus)] * scale;
const processor = data.cpuBands[lookup('cpu', data.cpus)];
const memory = lookup('ram', data.memoryCaps);
const center = Math.min(graphics, processor, memory);
const low = Math.max(0, Math.floor(center * 0.7 / 5) * 5);
const high = Math.ceil(center * 1.3 / 5) * 5;
const verdict = center >= 60 ? 'Likely smooth' : center >= 30 ? 'Playable with compromises' : 'Below target';
const limiting = center === memory ? 'System memory' : center === processor ? 'Processor' : 'Graphics card';
console.log(JSON.stringify({ estimateFpsRange: [low, high], verdict, limiting }, null, 2));
