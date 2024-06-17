import { IEvent } from "@/entities/Event/types"

export interface IMuseum {
  title: string
  _id: string
  description: string
  descriptionExt: string
  primaryImage: string
  galleryImages: string[]
  events: string[]
}
export interface UpdateMuseum {
  title: string
  _id: string
  description: string
  descriptionExt: string
  primaryImage: string
  galleryImages: string[]
  events: IEvent[]
}
export interface CreateMuseum {
  description: string
  descriptionExt: string
  primaryImage: string
  galleryImages: string[]
  events: string[]
  title: string
  username: string
  password: string
}