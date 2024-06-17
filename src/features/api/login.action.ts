"use server"

import { LoginData } from "@/entities"
import { $api } from "@/shared"

export default async function signin(username: string, password: string, role: string): Promise<LoginData | string> {
  try {
    console.log('There')
    role = role ? role : 'user'
    const res = await $api.post(`/auth/login`, {username, password, role})
    console.log('Why')
    return res.data as LoginData
  } catch (e: any) {
    console.log(e?.response?.data?.message)
    return e?.response?.data?.message
  }
}