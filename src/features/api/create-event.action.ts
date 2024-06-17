"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CreateEventParams, IEvent } from "@/entities";
import { $api } from "@/shared";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createEvent({ event }: CreateEventParams, access: string) {
  console.log(access)
  const data = {...event}
  const res = await $api.post<IEvent>('/event/create', data, {
    headers: {
      Authorization: access
    }
  })
  return res.data

}