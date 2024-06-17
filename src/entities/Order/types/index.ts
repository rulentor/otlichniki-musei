import { IEvent } from "@/entities/Event/types"
import { IUser } from "@/entities/User/types"

export interface IOrder {
  event: string,
  buyer: string,
  _id: string
  meetDate: Date
}
export interface FullOrder {
  event: IEvent
  buyer: IUser
  _id: string
  meetDate: Date
}