"use client"
import { Button } from "@/shared"
import { signOut } from "next-auth/react"
import { SyntheticEvent } from "react"

export default function Page() {
  const onClick = async (e: SyntheticEvent) => {
    e.preventDefault()
    await signOut()
  }
  return (
    <Button onClick={async (e: SyntheticEvent) => await onClick(e)}>H</Button>
  )
}