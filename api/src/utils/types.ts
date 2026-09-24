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

export type Service = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateServiceRequest = {
  name: string;
  description?: string;
  imageUrl?: string;
  price: string;
};

export type UpdateServiceRequest = {
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: string;
};

export type UpdateServiceStatusRequest = {
  isActive: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  sellingPrice: string;
  costPrice: string;
  stockQuantity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProductRequest = {
  name: string;
  description?: string;
  imageUrl?: string;
  sellingPrice: string;
  costPrice: string;
  stockQuantity?: number;
};

export type UpdateProductRequest = {
  name?: string;
  description?: string;
  imageUrl?: string;
  sellingPrice?: string;
  costPrice?: string;
  stockQuantity?: number;
};

export type UpdateProductStatusRequest = {
  isActive: boolean;
};  