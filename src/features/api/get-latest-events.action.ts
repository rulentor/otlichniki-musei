"use server"

import { ICategory, IEvent } from "@/entities"
import { IMuseum } from "@/entities/Museum/types"
import { IUser } from "@/entities/User/types"
import { $api } from "@/shared"
import { FullEvent } from "./get-related-events.action"
export default async function getLatest({
  museum,
  limit,
  page,
  regex
} : {
  museum: string
  limit: number,
  page: string,
  regex: string
}) {
  const res = await $api.post<{data: {el: IEvent, organizer: IMuseum, category: ICategory}[], totalPages: number}>(`/event/get-latest`, {museum, page, limit, regex})
  let events: FullEvent[] = []
  for (let i in res.data.data) {
    events.push({...res.data.data[i].el, organizer: res.data.data[i].organizer, category: res.data.data[i].category})
  }
  console.log(events)
  return {events, totalPages: res.data.totalPages}
}