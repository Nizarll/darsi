import { Database } from "bun:sqlite";
import { CREATE_DATABASE } from "./constants";

let db: Database | null = null;

export function getDatabase(): Database {
  if (!db) return initializeDatabase();
  return db;
}

function initializeDatabase(): Database {
  db = new Database("local.db");
  db.run(CREATE_DATABASE);
  return db;
}
