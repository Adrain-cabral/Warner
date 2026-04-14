const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./rp.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS paises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT UNIQUE,
      dinheiro INTEGER DEFAULT 0,
      populacao INTEGER DEFAULT 0,
      exercito INTEGER DEFAULT 0,
      estabilidade INTEGER DEFAULT 50,
      fabricas-civis INTEGER DEFAULT 0

    )

    INSERT INTO paises (nome) VALUE ("Brasil");
  `);
});



module.exports = db;