import * as migration_0001-create-admin-user from './0001-create-admin-user';
import * as migration_20251118_073955 from './20251118_073955';
import * as migration_seed from './seed';

export const migrations = [
  {
    up: migration_0001-create-admin-user.up,
    down: migration_0001-create-admin-user.down,
    name: '0001-create-admin-user',
  },
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
