"use server"

import { IMuseum } from "@/entities/Museum/types"
import { IUser } from "@/entities/User/types"
import { $api } from "@/shared"

export default async function getOrganizerData({eventId}: {eventId: string}) {
  const res = await $api.get<IMuseum>(`/event/organizer_data/${eventId}`)
  return res.data
}