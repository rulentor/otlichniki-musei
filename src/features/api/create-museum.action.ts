"use server"

import { CreateMuseum, IMuseum } from "@/entities/Museum/types";
import { $api } from "@/shared";

export default async function createMuseum(data: CreateMuseum) {
  const res = await $api.post(`/museum/create`, data)
  return res.data
}
