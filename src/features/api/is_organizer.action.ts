"use server"

import { $api } from "@/shared"
import { JWT } from "next-auth/jwt"
export default async function isOrganizer({_id, access}: {_id: string, access: JWT | undefined}) {
  const data = access + ' ' + _id
  const res = await $api.get<{is_organizer: boolean}>(`/event/is_organizer/${access}`, {
    headers: {
      Authorization: data,
      
    }
  })
  return res.data
}