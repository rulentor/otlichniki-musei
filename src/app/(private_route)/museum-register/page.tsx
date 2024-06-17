"use client"

import { CreateMuseum, IMuseum } from "@/entities/Museum/types"
import createMuseum from "@/features/api/create-museum.action"
import { Button, Input } from "@/shared"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function MuseumRegister() {
  let [museum, setMuseum] = useState<CreateMuseum>({title: '', description: '', descriptionExt: '', primaryImage: '', events: [], galleryImages: [], password: '', username: ''})
  let router = useRouter()
  let onClick = async () => {
    let data = await createMuseum(museum)
    router.push('/sign-in')
  }
  return (
    <>
      <Input value={museum.title} onChange={(e) => setMuseum({...museum, title: e.target.value})} placeholder="Название"></Input>
      <Input value={museum.description} onChange={(e) => setMuseum({...museum, description: e.target.value})} placeholder="Описание"></Input>
      <Input value={museum.descriptionExt} onChange={(e) => setMuseum({...museum, descriptionExt: e.target.value})} placeholder="Более длинное"></Input>
      <Input value={museum.primaryImage} onChange={(e) => setMuseum({...museum, primaryImage: e.target.value})} placeholder="Картинка"></Input>
      <Input value={museum.username} onChange={(e) => setMuseum({...museum, username: e.target.value})} placeholder="Юзернэйм"></Input>
      <Input value={museum.password} onChange={(e) => setMuseum({...museum, password: e.target.value})} placeholder="Пароль"></Input>
      <Button onClick={async () => await onClick()}>Go</Button>
    </>
  )
}