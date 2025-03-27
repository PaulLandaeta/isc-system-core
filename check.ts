import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres', 
    password: 'postgres', 
    database: 'postgres' 
  }
});

async function verificarTablas() {
  try {
    const tables = await db.raw(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    console.log('Tablas encontradas:', tables.rows);

    const modalitiesData = await db('modalities').select('*');
    console.log('Datos en modalities:', modalitiesData);

  } catch (error) {
    console.error('Error verificando datos:', error);
  } finally {
    await db.destroy(); // Cierra la conexión
  }
}

verificarTablas();
