export interface User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  phone: string;
}


export type UserCreate = Omit<User, "id">;
export type UserUpdate = Partial<User>;
