"use server"

import { ICategory, IEvent } from "@/entities"
import { IUser } from "@/entities/User/types"
import { $api } from "@/shared"
import { FullEvent } from "./get-related-events.action"
import { FullOrder, IOrder } from "@/entities/Order/types"

export async function getOrdersByUser({
  userId,
  page,
  limit
} : {
  userId: string,
  page: number,
  limit: number
}) {
  const res = await $api.post<{data: {el: IOrder, user: IUser, event: IEvent}[], totalPages: number}>(`/order/get-orders-by-user`, {userId, page, limit: 3})
  let events: FullOrder[] = []
  for (let i in res.data.data) {
    events.push({...res.data.data[i].el, buyer: res.data.data[i].user, event: res.data.data[i].event})
  }
  console.log(events)
  return {events, totalPages: res.data.totalPages}
}