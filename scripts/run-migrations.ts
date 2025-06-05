import dotenv from 'dotenv';

import { runMigrations } from '../src/config/migrate';

dotenv.config();

(async () => {
  try {
    await runMigrations();
    console.log('✅ Migraciones ejecutadas con éxito.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al ejecutar migraciones:', err);
    process.exit(1);
  }
})();
