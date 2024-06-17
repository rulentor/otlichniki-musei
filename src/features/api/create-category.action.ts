"use server"

import { ICategory } from "@/entities"
import { $api } from "@/shared"

export default async function createCategory(data: {categoryName: string}) {
  const res = await $api.post<ICategory>('/category/create', data)
  return res.data

}