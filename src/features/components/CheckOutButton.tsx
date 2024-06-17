"use client"
import { UpdateEvent } from '@/entities/Event/types'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { Alert, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Checkbox, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared'
import Checkout from './Checkout'
import { signIn, useSession } from 'next-auth/react'
import { IUser } from '@/entities/User/types'
import getUserData from '../api/get-user-data.action'
import getUserId from '../api/get-user-id.action'
import { Loader2 } from 'lucide-react'
import createOrder from '../api/create-order.action'
import DatePicker from "react-datepicker";
import { v4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from '@/shared/ui/use-toast'
import { ToastAction } from '@/shared/ui/toast'
import isSubscribed from '../api/is-subscribe.action'
import register from '../api/register.action'
import { DestructiveAlert } from '@/entities'
import { useRouter } from 'next/navigation'

const CheckoutButton = ({ event, eventId, userData, InitUserId, initSubscribed }: { event: UpdateEvent, eventId: string, userData: IUser, InitUserId: string | null, initSubscribed:  {date: Date} | null}) => {
  const {status, data} = useSession()
  let router = useRouter()
  let [form, setForm] = useState<IUser>(userData)
  let [account, setAccount] = useState<{username: string, password: string}>({username: '', password: ''})
  let [isChecked, setChecked] = useState(true)
  let [userId, setUserId] = useState(InitUserId ? InitUserId : '')
  let [isLoading, setLoading] = useState(false)
  let [isSuccess, setSuccess] = useState(false)
  let [datePickerError, setDatePickerError] = useState('')
  let [meetDate, setMeetDate] = useState(new Date())
  let [dayWeek, setDayWeek] = useState('next')
  let [Subscribed, setSubscribed] = useState<{date: Date} | null>(initSubscribed)
  let [serverError, setServerError] = useState('')

  const createAuthOrder = async () => {
    setLoading(true)
    const order = await createOrder({buyer: userId, event: eventId, meetDate})
    setSuccess(true)
    toast({
      title: 'hi',
      description: "и",
      action: (
        <ToastAction altText='Go'>Go</ToastAction>
      )
    })
    alert('Вы успешно зарегистрировались')
    setLoading(false)
  }
  const changeDate = (date: Date) => {
    //setMeetDate
    let hours = String(date.getHours()) + ':' + String(date.getMinutes())
    if (hours.slice(-1) == '0') hours = hours + '0'
    console.log(hours)
    console.log(hours[-1])
    let dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][date.getDay()]
    let isExist = false
  for (let el in event.days[dayOfWeek]) {
    if (event.days[dayOfWeek][el].startDate == hours) {
      isExist = true
    }
  }
    console.log(isExist)
    if (!isExist) setDatePickerError('На эту дату в это время невозможна запись')
    if (isExist) setDatePickerError('')
    setMeetDate(date)
    console.log(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][new Date().getDay()])
  }
  useEffect(() => {
    changeDate(meetDate)
  }, [])
  let set = (val: string) => {
    setDayWeek(val)
    console.log(dayWeek)
  }
  const checkedOrder = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const user = await register({...form, username: account.username, password: account.password})
    if (typeof user == 'string') {
      // setServerError(user)
      setLoading(false)
      return
    }
    console.log(user)
    let id = await getUserId(user.refreshToken)
    console.log(id)
    const order = await createOrder({event: eventId, buyer: id, meetDate})
    setSuccess(true)
    setLoading(false)
    router.push(`/sign-in?username=${account.username}`)
  }
  let NotCheckedOrder = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const user = await register({...form, username: v4(), password: v4()})
    if (typeof user == 'string') {
      // setServerError(user)
      setLoading(false)
      return
    }
    console.log(user)
    let id = await getUserId(user.refreshToken)
    console.log(id)
    const order = await createOrder({event: eventId, buyer: id, meetDate})
    setSuccess(true)
    setLoading(false)
  }
  const AuthOrder = async (e: any) => {
    e.preventDefault()
    if (isChecked) await checkedOrder(e)
    if (!isChecked) await NotCheckedOrder(e)
  }

  return (
    <div className="flex items-center gap-3">
        <>
        <h1>{status}</h1>
        {status == 'unauthenticated' &&
          <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            <Button asChild className="button rounded-full" size="lg">
            <p>
            Забронировать
            </p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Ваши данные:</AlertDialogTitle>
              <AlertDialogDescription>
              <Input type="text" placeholder="Имя" className="input-field mt-3" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}/>
                <Input type="text" placeholder="Фамилия" className="input-field mt-3" value={form.surname} onChange={(e) => setForm({...form, surname: e.target.value})}/>
                <Input type="text" placeholder="Отчество" className="input-field mt-3" value={form.patronymic} onChange={(e) => setForm({...form, patronymic: e.target.value})}/>
                <Input type="text" placeholder="Телефон" className="input-field mt-3" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}/>
                <Input type="text" placeholder="Эл. почта" className="input-field mt-3" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
                <p>Дата посещения:</p>
                 <DatePicker selected={meetDate} onChange={(date) => date != null ? changeDate(date): false} wrapperClassName='datePicker' dateFormat='dd/MM HH:mm' showTimeSelect timeFormat='HH:mm' className='input-field mt-3 mr-2' />
                  {datePickerError && <p>{datePickerError}</p>}
                  <p>Введите логин и пароль, чтобы смотреть все ваши заказы на сайти онлайн</p>
                <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Заполнить данные</label>
                                <Checkbox
                                id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" checked={isChecked} onCheckedChange={() => setChecked(!isChecked)}/>
                {isChecked &&
                  <>
                    <Input type="text" placeholder="Логин" className="input-field mt-3" value={account.username} onChange={(e) => setAccount({...account, username: e.target.value})}/>
                    <Input type="text" placeholder="Пароль" className="input-field mt-3" value={account.password} onChange={(e) => setAccount({...account, password: e.target.value})}/>
                  </>
                }
                {serverError && <DestructiveAlert title='О, ошибка сервера' description={serverError}/>}
                {isSuccess && <Alert>Запись прошла успешно! Ожидайте уведомления</Alert>}
                </AlertDialogDescription></AlertDialogHeader><AlertDialogFooter>
                <AlertDialogCancel>Выйти</AlertDialogCancel>
                <AlertDialogAction disabled={isLoading || Boolean(datePickerError) || Boolean(serverError)} onClick={async (e) => await AuthOrder(e)}>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Запись</AlertDialogAction>
                  </AlertDialogFooter></AlertDialogContent></AlertDialog>
      }
        {data?.user?.role == 'user' && !Subscribed &&
          <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            <Button asChild className="button rounded-full" size="lg">
            <p>
            Забронировать
            </p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Ваши данные:</AlertDialogTitle>
              <AlertDialogDescription>
              <Input type="text" placeholder="Имя" className="input-field mt-3" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}/>
                <Input type="text" placeholder="Фамилия" className="input-field mt-3" value={form.surname} onChange={(e) => setForm({...form, surname: e.target.value})}/>
                <Input type="text" placeholder="Отчество" className="input-field mt-3" value={form.patronymic} onChange={(e) => setForm({...form, patronymic: e.target.value})}/>
                <Input type="text" placeholder="Телефон" className="input-field mt-3" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}/>
                <Input type="text" placeholder="Эл. почта" className="input-field mt-3" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
                <p>Дата посещения:</p>
                 <DatePicker selected={meetDate} onChange={(date) => date != null ? changeDate(date): false} wrapperClassName='datePicker' dateFormat='dd/MM HH:mm' showTimeSelect timeFormat='HH:mm' className='input-field mt-3 mr-2' />
                  {datePickerError && <p>{datePickerError}</p>}
                
                </AlertDialogDescription></AlertDialogHeader><AlertDialogFooter>
                <AlertDialogCancel>Выйти</AlertDialogCancel>
                <AlertDialogAction disabled={isLoading || Boolean(datePickerError)} onClick={async () => await createAuthOrder()}>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Запись</AlertDialogAction>
                  </AlertDialogFooter></AlertDialogContent></AlertDialog>
        }
        
        {data?.user?.role == 'museum' &&
          <Button asChild className="button rounded-full" size="lg">
          <Link href={`/order/${event._id}`}>
          Посмотреть заказы</Link>
      </Button>
        }
        {Subscribed &&
          <Button asChild className="button rounded-full" size="lg">
          <p>
          Вы уже зарегистрированы ({Subscribed.date.getDay()}/{Subscribed.date.getHours()}/{Subscribed.date.getMinutes()})
          </p>
      </Button>
        }
        {
        isLoading && <Button disabled asChild className="button rounded-full" size="lg">
          <p>
          Подгружаем
          </p>
      </Button>}
        </>
    </div>
  )
}

export default CheckoutButton