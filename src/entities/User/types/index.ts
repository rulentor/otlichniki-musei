import { JWT } from "next-auth/jwt"

export interface IUser {
  username: string;
  name: string
  surname: string
  patronymic: string
  email: string
  phone: string
}
export interface LoginData {
  role: 'museum' | 'user'
  accessToken: JWT,
  refreshToken: JWT
  expiresIn: number
}
export interface CreateUser {
  username: string;
  name: string
  surname: string
  patronymic: string
  email: string
  phone: string
  password: string
}