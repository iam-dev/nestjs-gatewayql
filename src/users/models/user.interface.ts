export interface User {
  id?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  redirectUri?: string;
  role?: UserRole;
  createdAt?: number;
  updatedAt?:number;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}