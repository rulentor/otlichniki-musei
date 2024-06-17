"use server"

import { IEvent } from "@/entities"
import { FullOrder, IOrder } from "@/entities/Order/types"
import { IUser } from "@/entities/User/types"
import { $api } from "@/shared"

export default async function getOrdersByEvent({eventId, searchString}: {eventId: string, searchString: string}) {
  const res = await $api.post<{order: IOrder, event: IEvent, buyer: IUser}[]>(`/order/get-orders-by-event`, {eventId, searchString})
  return res.data
}