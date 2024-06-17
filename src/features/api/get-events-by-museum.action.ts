"use server"

import { IEvent } from "@/entities";
import { IOrder } from "@/entities/Order/types";
import { $api } from "@/shared";
import { JWT } from "next-auth/jwt";

export default async function getEventsByMuseum({access, searchString}: {access: JWT | undefined, searchString: string}) {
  const res = await $api.post<IEvent[]>('/event/get-by-museum', {searchString}, {
    headers: {
      Authorization: access as unknown as string || ''
    }
  })
  return res.data
}