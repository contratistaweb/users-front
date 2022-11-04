export interface User {
  create_time: Date;
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  phone: string;
}


export type UserCreate = Omit<User, "id">;
export type UserUpdate = Partial<User>;
