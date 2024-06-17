"use server"

import { IMuseum } from "@/entities/Museum/types"
import { $api } from "@/shared"

export default async function getAllMuseums() {
  const data = await $api.get<IMuseum[]>(`/museum/get_all`)
  console.log(data.data)
  return data.data
}