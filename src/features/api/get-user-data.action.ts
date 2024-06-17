"use server"

import { IUser } from "@/entities/User/types"
import { $api } from "@/shared"
import { JWT } from "next-auth/jwt"

export default async function getUserData(refresh: JWT | undefined){
  const res = await $api.post<null | IUser>('/event/get-user-data', {refresh})
  return res.data
}