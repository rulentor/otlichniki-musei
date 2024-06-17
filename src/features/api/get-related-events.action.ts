"use server"

import { ICategory, IEvent } from "@/entities"
import { IMuseum } from "@/entities/Museum/types"
import { IUser } from "@/entities/User/types"
import { $api } from "@/shared"
export type FullEvent = {
  _id: string
  title: string;
        description: string;
        location: string;
        imageURL: string;
        organizer: IMuseum
        days: {
          monday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
          tuesday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
          wednesday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
          thursday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
          friday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
          saturday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
          sunday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[]}
        category: ICategory;
        price: string;
        isFree: boolean;
        phone: string;
}
export default async function getRelatedEvents({
  category,
  eventId,
  limit,
  page
} : {
  category: string,
  eventId: string,
  limit: number,
  page: string
}) {
  const res = await $api.post<{data: {el: IEvent, organizer: IMuseum, category: ICategory}[], totalPages: number}>(`/event/get_related`, {category, eventId, page, limit})
  let events: FullEvent[] = []
  for (let i in res.data.data) {
    events.push({...res.data.data[i].el, organizer: res.data.data[i].organizer, category: res.data.data[i].category})
  }
  console.log(events)
  return {events, totalPages: res.data.totalPages}
}