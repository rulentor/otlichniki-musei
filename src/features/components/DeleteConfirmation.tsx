'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import DeleteIcon from '@/shared/icons/delete.svg'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared'

import { DeleteEvent } from '@/features/api/delete-event.action'

export const DeleteConfirmation = ({ eventId, onDelete }: { eventId: string, onDelete: () => void }) => {
  // const pathname = usePathname()
  let [isPending, startTransition] = useTransition()
  let Clicked = async () => {
    await DeleteEvent({eventId})
    onDelete()
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image src={DeleteIcon} alt="edit" width={20} height={20} />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Вы хотите удалить это событие?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            Это невозвратно удалит событие
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Не надо</AlertDialogCancel>

          <AlertDialogAction
            onClick={Clicked}>Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}