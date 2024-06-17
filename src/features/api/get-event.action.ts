"use server"
import { CreateEventParams, IEvent } from "@/entities";
import { UpdateEvent } from "@/entities/Event/types";
import { $api } from "@/shared";
import { useSession } from "next-auth/react";


export async function getEvent({eventId}: {eventId: string}) {
  try {
    const res = await $api.get<{event: UpdateEvent, category: string}>(`/event/${eventId}`)
    return res.data
  } catch (e) {
    throw e
  }

}