#!/usr/bin/env node
/**
 * Hash a password for ADMIN_PASSWORD_HASH (bcrypt).
 * Usage: node scripts/hash-admin-password.mjs
 * (types password; input is hidden if you use read -s in shell instead)
 */
import { createRequire } from "module";
import * as readline from "readline";

const require = createRequire(import.meta.url);
const bcrypt = require("bcryptjs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter password to hash: ", (password) => {
  rl.close();
  if (!password || password.length < 12) {
    console.error("Use a password with at least 12 characters.");
    process.exit(1);
  }
  const hash = bcrypt.hashSync(password, 12);
  console.log("\nAdd to .env / Vercel as ADMIN_PASSWORD_HASH:\n");
  console.log(hash);
  console.log("");
  process.exit(0);
});
