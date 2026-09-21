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
      isActive: users.isActive,
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
      isActive: users.isActive,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users);
};

//get a user by id
export const getUserById = async (id: string) => {
  const [user] = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phone: users.phone,
      isAdmin: users.isAdmin,
      isActive: users.isActive,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  return user;
};

//update a user by id
export const updateUser = async (
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
  },
) => {
  if (data.email !== undefined) {
    const [existingEmail] = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);

    if (existingEmail && existingEmail.id !== id) {
      throw new Error("A user with this email already exists");
    }
  }

  if (data.phone !== undefined) {
    const [existingPhone] = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.phone, data.phone))
      .limit(1);

    if (existingPhone && existingPhone.id !== id) {
      throw new Error(
        "A user with this phone number already exists",
      );
    }
  }

  const updateData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    updatedAt: Date;
  } = {
    updatedAt: new Date(),
  };

  if (data.firstName !== undefined) {
    updateData.firstName = data.firstName;
  }

  if (data.lastName !== undefined) {
    updateData.lastName = data.lastName;
  }

  if (data.email !== undefined) {
    updateData.email = data.email;
  }

  if (data.phone !== undefined) {
    updateData.phone = data.phone;
  }

  if (data.password !== undefined) {
    updateData.password = await bcrypt.hash(data.password, 12);
  }

  const [user] = await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phone: users.phone,
      isAdmin: users.isAdmin,
      isActive: users.isActive,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  return user;
};

//deactivate a user by id
export const updateUserStatus = async (
  id: string,
  isActive: boolean,
) => {
  const [user] = await db
    .update(users)
    .set({
      isActive,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phone: users.phone,
      isAdmin: users.isAdmin,
      emailVerified: users.emailVerified,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  return user;
};