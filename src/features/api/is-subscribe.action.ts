"use server"

import { $api } from "@/shared"

export default async function isSubscribed({access, eventId}: {access: JWT, eventId: string}) {
  try {
    const res = await $api.post<null | {date: string}>(`/order/is-subscribed`, {eventId}, {
      headers: {
        Authorization: access
      }
    })
    console.log(res.data)
    if (res.data) {
      return {date: new Date(res.data.date)}
    } else return null
  } catch (e: any) {
    console.log(e)
    return null
  }
}