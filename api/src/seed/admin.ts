import bcrypt from "bcrypt";
import "dotenv/config";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema";

const createAdmin = async () => {
  const firstName = "Joshua";
  const lastName = "Mutambuki";
  const email = "mutambukijoshua2@gmail.com";

  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is not set");
  }

  const existingAdmin = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingAdmin.length > 0) {
    console.log("Admin user already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await db.insert(users).values({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    isAdmin: true,
  });

  console.log("Admin user created successfully.");
};

createAdmin().catch((error) => {
  console.error("Failed to create admin:", error);
  process.exit(1);
});