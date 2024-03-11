export class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface UserResponse {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
