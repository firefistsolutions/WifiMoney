import * as migration_20251118_073955 from './20251118_073955';
import * as migration_seed from './seed';

export const migrations = [
  {
    up: migration_20251118_073955.up,
    down: migration_20251118_073955.down,
    name: '20251118_073955',
  },
  {
    up: migration_seed.up,
    down: migration_seed.down,
    name: 'seed'
  },
];
