export interface User {
  id?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  redirectUri?: string;
  createdAt?: number;
  updatedAt?:number
}