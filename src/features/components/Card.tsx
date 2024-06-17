"use client"
import { IEvent } from '@/entities'
import { formatDateTime } from '@/entities/Event/helpers'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { UpdateEvent } from '@/entities/Event/types'
import Edit from '@/shared/icons/edit.svg'
import Arrow from '@/shared/icons/arrow.svg'
import isOrganizer from '../api/is_organizer.action'
import { useSession } from 'next-auth/react'
import { IUser } from '@/entities/User/types'
import getOrganizerData from '../api/get-organizer-data.cation'
import { FullEvent } from '../api/get-related-events.action'
import Museum from '@/shared/images/portrait-ancient-roman-palace.jpg'
import { JWT } from 'next-auth/jwt'
import { IMuseum } from '@/entities/Museum/types'
type CardProps = {
  event: (IEvent | FullEvent),
  hasOrderLink?: boolean,
  hidePrice?: boolean,
  index: number,
  onDelete: (index: number) => void
}

const Card = ({ event, hasOrderLink, hidePrice, index, onDelete }: CardProps) => {
  let [isEventCreator, setEventCreator] = useState(false)
  let [organizerData, setOrganizerData] = useState<IMuseum>({} as IMuseum)
  const {data, status} = useSession()
  let onClickDelete = () => {
    onDelete(index)
  }
  console.log('event')
  console.log(event._id)
  const getIsOrganized = async () => {
    const res = await isOrganizer({_id: event._id, access: data?.user?.refreshToken})
    if (res?.is_organizer == undefined) setEventCreator(false)
    else setEventCreator(res.is_organizer)
  }
  const setup = useMemo(() => {
    if (status == 'authenticated') {
      getIsOrganized()
    }
  }, [status])
  useEffect(() => {
    const getData = async () => {
      const res = await getOrganizerData({eventId: event._id})
      setOrganizerData(res)
    }
    getData()
  }, [])
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        href={`/event/${event._id}`}
        style={{backgroundImage: `url(${Museum})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {/* IS EVENT CREATOR ... */}

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/event/update/${event._id}`}>
            <Image src={Edit} alt="edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation eventId={event._id} onDelete={onClickDelete}/>
        </div>
      )}

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 
       {!hidePrice && <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
            {event.isFree ? 'FREE' : `$${event.price}`}
          </span>
          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {typeof event.category == 'string' ? `${event.category}` : `${event.category.name}`}
          </p>
        </div>}

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {event.days.monday[0].startDate} - {event.days.monday[0].endDate}
        </p>

        <Link href={`/event/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{event.title}</p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {organizerData.title}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image src={Arrow} alt="search" width={10} height={10} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card