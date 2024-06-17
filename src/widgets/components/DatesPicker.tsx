"use client"
import Calendar from '@/shared/icons/calendar.svg'
import { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import { Button, Input } from "@/shared";
export default function DatesPicker({days, setDays}: {days: {
  monday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  tuesday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  wednesday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  thursday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  friday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  saturday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
  sunday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[]}, setDays: Dispatch<SetStateAction<{
    monday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
    tuesday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
    wednesday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
    thursday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
    friday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
    saturday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[], 
    sunday: {startDate: string, endDate: string, totalSpace: number, peopleCount: number}[]}>>}) {
      const setMonday = () => {
        let new_moday = days.monday
        new_moday.push({endDate: '', startDate: '', peopleCount: 0, totalSpace: 0})
        setDays({...days, monday: days.monday})
      }
      const onMonday = (startDate: string, endDate: string, totalSpace: number, index: number) => {
        let monday = days.monday
        monday[index] = {...monday[index], startDate, endDate, totalSpace}
        setDays({...days, monday})
    
      }
      const setTuesday = () => {
        let new_tuesday = days.tuesday
        new_tuesday.push({endDate: '', startDate: '', peopleCount: 0, totalSpace: 0})
        setDays({...days, tuesday: days.tuesday})
      }
      const onTuesday = (startDate: string, endDate: string, totalSpace: number, index: number) => {
        let tuesday = days.tuesday
        tuesday[index] = {...tuesday[index], startDate, endDate, totalSpace}
        setDays({...days, tuesday})
    
      }
      const setWednesday = () => {
        let new_wednesday = days.wednesday
        new_wednesday.push({endDate: '', startDate: '', peopleCount: 0, totalSpace: 0})
        setDays({...days, wednesday: days.wednesday})
      }
      const onWednesday = (startDate: string, endDate: string, totalSpace: number, index: number) => {
        let wednesday = days.wednesday
        wednesday[index] = {...wednesday[index], startDate, endDate, totalSpace}
        setDays({...days, wednesday})
      }
      const onThursday = (startDate: string, endDate: string, totalSpace: number, index: number) => {
        let thursday = days.thursday
        thursday[index] = {...thursday[index], startDate, endDate, totalSpace}
        setDays({...days, thursday})
      }
      const setThursday = () => {
        let new_wednesday = days.thursday
        new_wednesday.push({endDate: '', startDate: '', peopleCount: 0, totalSpace: 0})
        setDays({...days, thursday: days.thursday})
      }
      const onFriday = (startDate: string, endDate: string, totalSpace: number, index: number) => {
        let friday = days.friday
        friday[index] = {...friday[index], startDate, endDate, totalSpace}
        setDays({...days, friday})
      }
      const setFriday = () => {
        let new_friday = days.friday
        new_friday.push({endDate: '', startDate: '', peopleCount: 0, totalSpace: 0})
        setDays({...days, friday: days.friday})
      }
      const onSaturday = (startDate: string, endDate: string, totalSpace: number, index: number) => {
        let saturday = days.saturday
        saturday[index] = {...saturday[index], startDate, endDate, totalSpace}
        setDays({...days, saturday})
      }
      const setSaturday = () => {
        let new_friday = days.saturday
        new_friday.push({endDate: '', startDate: '', peopleCount: 0, totalSpace: 0})
        setDays({...days, saturday: days.saturday})
      }
      const onSunday = (startDate: string, endDate: string, totalSpace: number, index: number) => {
        let sunday = days.sunday
        sunday[index] = {...sunday[index], startDate, endDate, totalSpace}
        setDays({...days, sunday})
      }
      const setSunday = () => {
        let new_friday = days.sunday
        new_friday.push({endDate: '', startDate: '', peopleCount: 0, totalSpace: 0})
        setDays({...days, sunday: days.sunday})
      }
    return (
      <>
        <p className="input-field flex align-center justify-center">Понедельник</p>
        {days.monday.map((el, index) => (
          <div className="flex flex-col gap-5 md:flex-row"> 
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время начала ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.startDate} onChange={(e) => onMonday(e.target.value, days.monday[index].endDate, days.monday[index].totalSpace, index)}/>

          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время конца ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.endDate} onChange={(e) => onMonday(days.monday[index].startDate, e.target.value, days.monday[index].totalSpace, index)}/>
          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Кол-во мест ({index+1}):</p>
            <Input type="number"  className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.totalSpace} onChange={(e) => onMonday(days.monday[index].startDate, days.monday[index].endDate, Number(e.target.value), index)}/>
          </div>
          </div>

        ))
        }
        <Button onClick={e => setMonday()}>Добавить ещё мероприятий на понедельник</Button>
        <p className="input-field flex align-center justify-center">Вторник
        </p>
        {days.tuesday.map((el, index) => (
          <div className="flex flex-col gap-5 md:flex-row"> 
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время начала ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.startDate} onChange={(e) => onTuesday(e.target.value, days.tuesday[index].endDate, days.tuesday[index].totalSpace, index)}/>

          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время конца ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.endDate} onChange={(e) => onTuesday(days.tuesday[index].startDate, e.target.value, days.tuesday[index].totalSpace, index)}/>
          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Кол-во мест ({index+1}):</p>
            <Input type="number" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.totalSpace} onChange={(e) => onTuesday(days.tuesday[index].startDate, days.tuesday[index].endDate, Number(e.target.value), index)}/>
          </div>
          </div>

        ))
        }
        <Button onClick={e => setTuesday()}>Добавить ещё мероприятий на вторник</Button>
        <Button onClick={() => console.log(days)}>Log</Button>
        <p className="input-field flex align-center justify-center">Среда
        </p>
        {days.wednesday.map((el, index) => (
          <div className="flex flex-col gap-5 md:flex-row"> 
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время начала ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.startDate} onChange={(e) => onWednesday(e.target.value, days.wednesday[index].endDate, days.wednesday[index].totalSpace, index)}/>

          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время конца ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.endDate} onChange={(e) => onWednesday(days.wednesday[index].startDate, e.target.value, days.wednesday[index].totalSpace, index)}/>
          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Кол-во мест ({index+1}):</p>
            <Input type="number" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.totalSpace} onChange={(e) => onWednesday(days.wednesday[index].startDate, days.wednesday[index].endDate, Number(e.target.value), index)}/>
          </div>
          </div>

        ))
        }
        <Button onClick={e => setWednesday()}>Добавить ещё мероприятий на среду</Button>
        <Button onClick={() => console.log(days)}>Log</Button>
        <p className="input-field flex align-center justify-center">Четверг
        </p>
        {days.thursday.map((el, index) => (
          <div className="flex flex-col gap-5 md:flex-row"> 
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время начала ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.startDate} onChange={(e) => onThursday(e.target.value, days.thursday[index].endDate, days.thursday[index].totalSpace, index)}/>

          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время конца ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.endDate} onChange={(e) => onThursday(days.thursday[index].startDate, e.target.value, days.thursday[index].totalSpace, index)}/>
          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Кол-во мест ({index+1}):</p>
            <Input type="number" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.totalSpace} onChange={(e) => onThursday(days.thursday[index].startDate, days.thursday[index].endDate, Number(e.target.value), index)}/>
          </div>
          </div>

        ))
        }
        <Button onClick={e => setThursday()}>Добавить ещё мероприятий на четверг</Button>
        <p className="input-field flex align-center justify-center">Пятница
        </p>
        {days.friday.map((el, index) => (
          <div className="flex flex-col gap-5 md:flex-row"> 
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время начала ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.startDate} onChange={(e) => onFriday(e.target.value, days.friday[index].endDate, days.friday[index].totalSpace, index)}/>

          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время конца ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.endDate} onChange={(e) => onMonday(days.friday[index].startDate, e.target.value, days.friday[index].totalSpace, index)}/>
          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Кол-во мест ({index+1}):</p>
            <Input type="number" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.totalSpace} onChange={(e) => onMonday(days.friday[index].startDate, days.friday[index].endDate, Number(e.target.value), index)}/>
          </div>
          </div>

        ))
        }
        <Button onClick={e => setFriday()}>Добавить ещё мероприятий на пятницу</Button>
        <p className="input-field flex align-center justify-center">Суббота
        </p>
        {days.saturday.map((el, index) => (
          <div className="flex flex-col gap-5 md:flex-row"> 
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время начала ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.startDate} onChange={(e) => onSunday(e.target.value, days.saturday[index].endDate, days.sunday[index].totalSpace, index)}/>

          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время конца ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.endDate} onChange={(e) => onSunday(days.saturday[index].startDate, e.target.value, days.sunday[index].totalSpace, index)}/>
          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Кол-во мест ({index+1}):</p>
            <Input type="number" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.totalSpace} onChange={(e) => onSunday(days.saturday[index].startDate, days.saturday[index].endDate, Number(e.target.value), index)}/>
          </div>
          </div>

        ))
        }
        <Button onClick={e => setSaturday()}>Добавить ещё мероприятий на субботу</Button>
        <p className="input-field flex align-center justify-center">Воскресенье
        </p>
        {days.sunday.map((el, index) => (
          <div className="flex flex-col gap-5 md:flex-row"> 
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время начала ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.startDate} onChange={(e) => onSunday(e.target.value, days.sunday[index].endDate, days.sunday[index].totalSpace, index)}/>

          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Время конца ({index+1}):</p>
            <Input type="text" placeholder="Время" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.endDate} onChange={(e) => onSunday(days.sunday[index].startDate, e.target.value, days.sunday[index].totalSpace, index)}/>
          </div>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <Image src={Calendar} alt='calendar' width={24} height={24} className='filter-grey' />
            <p className="ml-3 whitespace-nowrap text-grey-600">Кол-во мест ({index+1}):</p>
            <Input type="number"  className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={el.endDate} onChange={(e) => onSunday(days.sunday[index].startDate, days.sunday[index].endDate, Number(e.target.value), index)}/>
          </div>
          </div>

        ))
        }
        <Button onClick={e => setSunday()}>Добавить ещё мероприятий на воскресенье</Button>
      </>
    )
  }