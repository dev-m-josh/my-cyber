import { db } from "../db";
import { services } from "../db/schema";

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