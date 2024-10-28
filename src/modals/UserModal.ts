export interface User {
  id: number;
  firstname: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  createdAt: Date;
  updatedAt: Date;
}
