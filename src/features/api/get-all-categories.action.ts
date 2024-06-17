"use server"

import { ICategory } from "@/entities"
import { $api } from "@/shared"

export default async function getAllCategories() {
  const res = await $api.get<ICategory[]>('/category/get_all')
  return res.data
}