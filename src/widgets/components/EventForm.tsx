"use client"
const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}

import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import LocationGrey from '@/shared/icons/location-grey.svg'
import Calendar from '@/shared/icons/calendar.svg'
import Dollar from '@/shared/icons/dollar.svg'
import Link from '@/shared/icons/link.svg'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { $api, Button, useInputValidation } from "@/shared"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared"
import { Input } from "@/shared"
import { CreateEventParams, ICategory, eventFormSchema } from "@/entities"
import * as z from 'zod'
import { CategoryDropdown as Dropdown, getAllCategories } from "@/features"
import { Textarea } from "@/shared"
import { FileUploader } from "@/features"
import { SyntheticEvent, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/shared"
import { redirect, useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/features"
import { IEvent } from "@/entities"
import { generateComponents } from "@uploadthing/react"
import fileToBucket from "@/features/api/file_to_bucket.action"
import { Album, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { JWT } from 'next-auth/jwt'
import DatesPicker from './DatesPicker'


type EventFormProps = {
  userId: string
  type: "Create" | "Update"
  event?: IEvent,
  eventId?: string
}

const EventForm = () => {
  let [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const onChangeCategory = (title: string) => {
    console.log(title)
    setCategory(title)
  }
  const [imageURL, setImageURL] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const onChangeFile = async (file: File) => {
    const fileName = URL.createObjectURL(file)
    console.log(fileName)
    setImageURL(fileName)
  }
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [price, setPrice] = useState('')
  const [isFree, setIsFree] = useState(false)
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  let [isAllTime, setisAllTime] = useState(false)
  let [defaultTime, setDefaultTime] = useState<{startDate: string, endDate: string, totalSpace: number, peopleCount: number}[]>([{startDate: '', endDate: '', totalSpace: 0, peopleCount: 0}])
  let [days, setDays] = useState<{
  monday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  tuesday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  wednesday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  thursday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  friday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  saturday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  sunday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[]}>({
    monday: [{startDate: '', endDate: '', totalSpace: 0, peopleCount: 0}],
    wednesday: [{startDate: '', endDate: '', totalSpace: 0, peopleCount: 0}],
    tuesday: [{startDate: '', endDate: '', totalSpace: 0, peopleCount: 0}],
    thursday: [{startDate: '', endDate: '', totalSpace: 0, peopleCount: 0}],
    friday: [{startDate: '', endDate: '', totalSpace: 0, peopleCount: 0}],
    saturday: [{startDate: '', endDate: '', totalSpace: 0, peopleCount: 0}],
    sunday: [{startDate: '', endDate: '', totalSpace: 0, peopleCount: 0}]
})
  const {data, status} = useSession()
  let [token, setToken] = useState<JWT | undefined>(undefined)
  const router = useRouter()
  useEffect(() => {
    setToken(data?.user?.refreshToken)
    console.log(token)
  }, [])
  const NewcreateEvent = async (info: any, refreshToken: any) => {
    const res = await createEvent(info, refreshToken as unknown as string || '')
    console.log(res._id)
    router.push(`/event/${res._id}`)
  }
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const info: CreateEventParams = {event: {title, description, category, imageURL, location, price: price ? price : '0', isFree, phone, days}}
    const {event} = info
    console.log(data?.user?.refreshToken)
    NewcreateEvent(info, data?.user?.refreshToken)
    } catch (e: any) {
      console.log(e)
    }

    setLoading(false)
  }
  const onDefault = (startDate: string, endDate: string, totalSpace: number, index: number) => {
        let def = defaultTime
        def[index] = {...def[index], startDate, endDate, totalSpace}
        setDefaultTime(def)
        setDays({monday: defaultTime, tuesday: defaultTime, wednesday: defaultTime, thursday: defaultTime, friday: defaultTime, saturday: defaultTime, sunday: defaultTime})
  }
  const setDefault = () => {
        let def = defaultTime
        def.push({endDate: '', startDate: '', peopleCount: 0, totalSpace: 0})
        setDefaultTime(def)
        setDays({monday: defaultTime, tuesday: defaultTime, wednesday: defaultTime, thursday: defaultTime, friday: defaultTime, saturday: defaultTime, sunday: defaultTime})
  }
  const sit = () => {
    setDays({monday: defaultTime, tuesday: defaultTime, wednesday: defaultTime, thursday: defaultTime, friday: defaultTime, saturday: defaultTime, sunday: defaultTime})
    return true
  }
  let [val, setVal] = useState('10:00')

  return (
    
    <>  
    <>{JSON.stringify(data)}</>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
                <Input placeholder="Название" className="input-field" value={title} onChange={e => setTitle(e.target.value)}/>
                <Dropdown value={category} onChangeHandler={onChangeCategory} />
                
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
                  <Textarea placeholder="Описание" className="h-72 textarea rounded-2xl"value={description} onChange={e => setDescription(e.target.value)} ></Textarea>
                  <FileUploader imageURL={imageURL} setFile={setFile} onFieldChange={onChangeFile} />
                </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image src={LocationGrey} alt='calendar' width={24} height={24} />
            </div>
            <Input placeholder='Место проведения' className='input-field' value={location} onChange={e => setLocation(e.target.value)}/>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex justify-between items-center  h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 flex-col md:flex-row">
            <Album width={24} height={24} className='filter-grey' />
            <p  className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0">Время событий по дням недели</p>
            <div className="flex items-center">
            <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Поставить одинаковое время для всех дней недели</label>
                                <Checkbox
                                id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" checked={isAllTime} onCheckedChange={() => setisAllTime(!isAllTime)}/>
            </div>
          </div>
        </div>
        {!isAllTime && <DatesPicker days={days} setDays={setDays} />}
        {isAllTime && defaultTime.map((el, index) => 
          <div className="flex flex-col gap-5 md:flex-row"> 
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время начала ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.startDate} onChange={(e) => onDefault(e.target.value, defaultTime[index].endDate, defaultTime[index].totalSpace, index)}/>

          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время конца: ({index+1})</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.endDate} onChange={(e) => onDefault(defaultTime[index].startDate, e.target.value, defaultTime[index].totalSpace, index)}/>
          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Кол-во мест ({index+1}):</p>
            <Input type="number" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.totalSpace} onChange={(e) => onDefault(defaultTime[index].startDate, defaultTime[index].endDate, Number(e.target.value), index)}/>
          </div>
          </div>
        )
        }
        {isAllTime && <Button onClick={e => setDefault()}>Добавить ещё время на каждый день</Button>}
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image src={Dollar} alt='dollar' width={24} height={24} className='filter-grey' />
            <Input type="number" placeholder="Цена" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={isFree ? '0' : price} onChange={e => (!isFree && setPrice(e.target.value))}/>
            <div className="flex items-center">
            <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Бесплатно</label>
                                <Checkbox
                                id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" checked={isFree} onCheckedChange={() => setIsFree(!isFree)}/>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Link} alt='link' width={24} height={24} />
          <Input placeholder='Телефон' className='input-field' value={phone} onChange={e => setPhone(e.target.value)}></Input>
        </div>
        </div>
      </div>
      <Button size='lg' className='button col-span-2 w-full mt-4' disabled={loading} onClick={onSubmit}>
        {loading && 
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        }
        Добавить событие
      </Button>
    </>
  )
}

export default EventForm