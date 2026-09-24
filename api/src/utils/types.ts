export type Customer = {
  id: string;
  firstName: string;
  lastName: string | null;
  phone: string | null;
  email: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCustomerRequest = {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
};

export type UpdateCustomerRequest = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
};