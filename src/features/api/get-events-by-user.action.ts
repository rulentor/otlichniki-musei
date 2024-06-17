"use server"

import { ICategory, IEvent } from "@/entities"
import { IUser } from "@/entities/User/types"
import { $api } from "@/shared"
import { FullEvent } from "./get-related-events.action"
import { IMuseum } from "@/entities/Museum/types"

export async function getEventsByUser({
  userId,
  page,
  limit
} : {
  userId: string,
  page: number,
  limit: number
}) {
  const res = await $api.post<{data: {el: IEvent, organizer: IMuseum, category: ICategory}[], totalPages: number}>(`/event/events-by-user`, {userId, page, limit})
  let events: FullEvent[] = []
  for (let i in res.data.data) {
    events.push({...res.data.data[i].el, organizer: res.data.data[i].organizer, category: res.data.data[i].category})
  }
  console.log(events)
  return {events, totalPages: res.data.totalPages}
}