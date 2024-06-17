"use server"

import { $api } from "@/shared"

export default async function getExcelTables({eventId}: {eventId: string}) {
  const res = await $api.post<string>('/order/get-excel-tables', {eventId})
  console.log('khghsdsfasbv')
  console.log(res.data)
}