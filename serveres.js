import { createServer } from 'http';
import { sql } from './db.js';

const requestHandler = async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(version);
  } catch (error) {
    console.error(error);
    res.writeHead(500);
    res.end('Erro interno');
  }
};

createServer(requestHandler).listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
