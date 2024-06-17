"use server"
import { $api } from "@/shared"

export default async function fileToBucket(file: File) {
        let formdata = new FormData()
        formdata.append('image', file)
        const res = await $api.post('/bucket/upload', formdata)
        console.log(res)
  
}