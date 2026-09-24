import { db } from "../db";
import { services } from "../db/schema";
import { eq } from "drizzle-orm";

import {
  CreateServiceRequest,
  Service,
} from "../utils/types";

//create service
export const createService = async (
  service: CreateServiceRequest,
): Promise<Service> => {
  const [newService] = await db
    .insert(services)
    .values({
      name: service.name,
      description: service.description,
      imageUrl: service.imageUrl,
      price: service.price,
    })
    .returning();

  return newService;
};

//get all services
export const getServices = async (): Promise<Service[]> => {
  return await db
    .select()
    .from(services)
    .where(eq(services.isActive, true));
};

