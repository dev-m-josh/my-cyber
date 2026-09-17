import { db } from "../db";
import { customers } from "../db/schema";

export const getCustomers = async () => {
  return await db.select().from(customers);
};