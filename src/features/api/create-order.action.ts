"use server"

import { $api } from "@/shared"

export default async function createOrder({event, buyer, meetDate}: {event: string, buyer: string, meetDate: Date}) {
  console.log({event, buyer, meetDate})
  const res = await $api.post('/order/create', {event, buyer, meetDate})
  return res.data
}