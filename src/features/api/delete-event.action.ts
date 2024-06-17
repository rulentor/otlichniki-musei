"use server"

import { $api } from "@/shared"

export async function DeleteEvent({eventId}: {eventId: string}) {
  const res = await $api.post(`/event/delete/${eventId}`, {eventId})
  return res.data
}