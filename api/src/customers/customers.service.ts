import { eq } from "drizzle-orm";

import { db } from "../db";
import { customers } from "../db/schema";

import {
  CreateCustomerRequest,
  Customer,
  UpdateCustomerRequest
} from "../utils/types";

// Create a new customer
export const createCustomer = async (
  customer: CreateCustomerRequest,
): Promise<Customer> => {
  if (customer.email) {
    const [existingEmail] = await db
      .select({
        id: customers.id,
      })
      .from(customers)
      .where(eq(customers.email, customer.email))
      .limit(1);

    if (existingEmail) {
      throw new Error(
        "A customer with this email already exists",
      );
    }
  }

  if (customer.phone) {
    const [existingPhone] = await db
      .select({
        id: customers.id,
      })
      .from(customers)
      .where(eq(customers.phone, customer.phone))
      .limit(1);

    if (existingPhone) {
      throw new Error(
        "A customer with this phone number already exists",
      );
    }
  }

  const [newCustomer] = await db
    .insert(customers)
    .values({
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      email: customer.email,
    })
    .returning();

  return newCustomer;
};

// Get all customers
export const getCustomers = async (): Promise<Customer[]> => {
  return await db.select().from(customers);
};

// Get customer by ID
export const getCustomerById = async (
  id: string,
): Promise<Customer | undefined> => {
  const [customer] = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id))
    .limit(1);

  return customer;
};

//update Customer
export const updateCustomer = async (
  id: string,
  data: UpdateCustomerRequest,
): Promise<Customer | undefined> => {

  // Check that the new email is not already used by another customer
  if (data.email !== undefined) {
    const [existingEmail] = await db
      .select({
        id: customers.id,
      })
      .from(customers)
      .where(eq(customers.email, data.email))
      .limit(1);

    if (existingEmail && existingEmail.id !== id) {
      throw new Error(
        "A customer with this email already exists",
      );
    }
  }

  // Check that the new phone number is not already used by another customer
  if (data.phone !== undefined) {
    const [existingPhone] = await db
      .select({
        id: customers.id,
      })
      .from(customers)
      .where(eq(customers.phone, data.phone))
      .limit(1);

    if (existingPhone && existingPhone.id !== id) {
      throw new Error(
        "A customer with this phone number already exists",
      );
    }
  }

  // If no fields were changed, return the existing customer
  if (Object.keys(data).length === 0) {
    return getCustomerById(id);
  }

  // Update the customer and record when the change was made
  const [customer] = await db
    .update(customers)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(customers.id, id))
    .returning();

  return customer;
};
