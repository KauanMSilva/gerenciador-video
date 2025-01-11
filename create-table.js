import { sql } from './db.js';



sql`
  CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    duration INTEGER NOT NULL CHECK (duration > 0)
  );
`



.then(() => console.log('Tabela criada!'))
.catch((error) => console.error('Erro ao criar tabela:', error));

