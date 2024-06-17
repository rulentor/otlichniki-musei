
import { useSession } from "next-auth/react"
import { useMemo, useState } from "react"
import isOrganizer from "../api/is_organizer.action"
import Link from "next/link"
import Image from 'next/image'
import Edit from '@/shared/icons/edit.svg'
export default function CreatorUpdate({isEventCreator, id}: {isEventCreator: boolean, id: string}) {

  return (
    <>
      {isEventCreator && (
          <Link href={`/event/update/${id}`}>
            <Image src={Edit} alt="edit" width={20} height={20} />
          </Link>
      )}
    </>
  )
}