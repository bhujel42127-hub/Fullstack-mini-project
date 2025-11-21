export type User = {
  id: number;
  email: string;
  password: string;
  bio: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id?: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FieldType = {
  name?: string;
  bio?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type AuthProps = {
  children: any;
};
