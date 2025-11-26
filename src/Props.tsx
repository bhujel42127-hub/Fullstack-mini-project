export type User = {
  id: number;
  email: string;
  password: string;
  newPassword: string;
  bio: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FieldType = {
  name: string;
  bio?: string;
  email: string;
  password: string;
  newPassword: string;
};

export type AuthProps = {
  children: React.ReactNode;
};
