export class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  login: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
