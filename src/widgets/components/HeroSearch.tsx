"use client"

import getLatest from "@/features/api/get-latest-events.action";
import getAllMuseums from "@/features/api/get-all-museums.action";
import { useEffect, useState } from "react";
import { IMuseum } from "@/entities/Museum/types";
import { FullEvent } from "@/features/api/get-related-events.action";
import { Button, useDebounce } from "@/shared";
import Search from "./Search";
import CategoryFilter from "@/widgets/components/CategoryFilter";
import Collected from "@/features/components/Collected";
import { IEvent } from "@/entities";
import Link from 'next/link'
export default function HeroSearch({museums, initEvents}: {museums: IMuseum[], initEvents: FullEvent[]}) {
  let [museum, setMuseum] = useState(museums[0].title)
  let [events, setEvents] = useState<FullEvent[]>(initEvents)
  let [regex, setRegex] = useState('')
  let [page, setPage] = useState('1')
  let [totalPages, setTotalPages] = useState(0)
  let onChangeRegex = (str: string) => {
    setRegex(str)
  }
  let limit = 6
  let getEvents = async () => {
    console.log('ev yeee')
    let data = await getLatest({museum, limit, page, regex})
    console.log(data)
    setEvents(data.events)
    setTotalPages(data.totalPages)
  }
  let changePage = (el: number) => {
    setPage(page+=el)
    getEvents()
  }
  let onChangeMuseum = (val: string) => {
    setMuseum(val)
  }
  return (
    <>
    <div className="flex w-full flex-col gap-5 md:flex-row ">
          <Search value={regex} onChange={(val: string) => onChangeRegex(val)}/>
          <CategoryFilter data={museums} onChange={(val: string) => onChangeMuseum(val)} defaultValue={museums[0].title}/>
        </div>
        <Button size="lg" asChild className="button w-full sm:w-fit" onClick={getEvents}>
                <p>Найти</p>
            </Button>
        <div className="mt-3">
        <Collected data={events} page={Number(page)} totalPages={totalPages} changePage={changePage}/>
        </div></>
  )
}