"use server"

import { LoginData } from "@/entities"
import { CreateUser, IUser } from "@/entities/User/types"
import { $api } from "@/shared"

export default async function register(data: CreateUser): Promise<LoginData | string> {
  try {
    const res = await $api.post(`/auth/registration`, data)
    return res.data as LoginData
  } catch (e: any) {
    return e?.response?.data?.message
  }
}