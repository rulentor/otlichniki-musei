"use server"

import { CreateEventParams, IEvent } from "@/entities";
import { UpdateEvent } from "@/entities/Event/types";
import { $api } from "@/shared";
import { revalidatePath } from "next/cache";

export async function updateEvent({ eventId, event }: {eventId: string, event: UpdateEvent}) {
  const data = {...event}
  const res = await $api.post<IEvent>(`/event/update/${eventId}`, data)
  return res.data

}