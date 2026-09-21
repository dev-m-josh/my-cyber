import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema";

//create a new user
export const createUser = async (
  firstName: string,
  lastName: string | undefined,
  email: string,
  phone: string | undefined,
  password: string,
) => {
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const [user] = await db
    .insert(users)
    .values({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phone: users.phone,
      isAdmin: users.isAdmin,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt,
    });

  return user;
};

//get all users
export const getUsers = async () => {
  return await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phone: users.phone,
      isAdmin: users.isAdmin,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users);
};