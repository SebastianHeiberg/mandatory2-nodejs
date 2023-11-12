import db from './connection.js'

const isDeleteMode = process.argv.findIndex((arg) => arg === "delete") === -1 ? false: true

if (isDeleteMode) {
    await db.exec("DROP TABLE IF EXISTS userbase")
}

await db.exec(`
CREATE TABLE IF NOT EXISTS userbase (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role CHECK (role IN ('USER'))
);`);

// SEED the database
if (isDeleteMode) {
    await db.run("INSERT INTO userbase (email, password, role) VALUES ('test@test.dk', '$2b$14$ucxFu1.gSbbQ/pljcl5gOeVcQhv1uCEMpq1stESFH1b8PQrZI7EUC', 'USER')");
}