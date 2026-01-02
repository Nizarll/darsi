import bcrypt from "bcrypt";
import { CREATE_USER_QUERY, GET_USER_BY_USERNAME } from "./constants";
import { getDatabase } from "./utils";

export async function createUser(username: string, password: string, role: string) {
  const db = getDatabase();
  const hashed = await bcrypt.hash(password, 10);
  return db.run(CREATE_USER_QUERY, [username, hashed, role]);
}

export async function authenticateUser(username: string, password: string) {
  const db = getDatabase();
  const row = db.query(GET_USER_BY_USERNAME).get(username) as any;
  if (!row) return null;

  const valid = await bcrypt.compare(password, row.password);
  return valid ? row : null;
}

