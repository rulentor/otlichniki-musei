"use client"
import { Dispatch, SetStateAction, SyntheticEvent, useCallback } from "react"
import fileToBucket from "../api/file_to_bucket.action"
import {useDropzone} from '@uploadthing/react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import Image from "next/image"
import UploadImage from '@/shared/icons/upload.svg'
import { Button } from "@/shared"
import {FileUploader as FileUpload} from 'react-drag-drop-files'
type FileUploaderProps = {
  onFieldChange: (file: File) => void
  imageURL: string
  setFile: Dispatch<SetStateAction<File | null>>
}
const fileTypes = ["JPG", "PNG", "GIF"];
export default function FileUploader({imageURL, onFieldChange}: FileUploaderProps) {
  

  return (
    <div className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">

      {imageURL ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img src={imageURL} alt="image" width={250} height={250} className="w-full object-cover object-center"/>
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <Image src={UploadImage} width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <FileUpload handleChange={onFieldChange} name='file' types={fileTypes} />
        </div>
      )}
    </div>
  )
}