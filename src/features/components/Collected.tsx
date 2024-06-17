"use client"
import { ICategory, IEvent } from "@/entities";
import { IUser } from "@/entities/User/types";
import Card from "./Card";
import Pagination from "./Pagination";
import { FullEvent } from "../api/get-related-events.action";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Collected({data, page, totalPages, changePage}: {data: FullEvent[] | IEvent[], page: number, totalPages: number, changePage?: (el: number) => void}) {
  let [cardData, setCardData] = useState(data)
  let searchParams = useSearchParams()
  let pathname = usePathname()
  let router = useRouter()
  let onDelete = (index: number) => {
    setCardData(data.filter((el, ind) => ind !== index) as (IEvent[] | FullEvent[]))
  }
  let change = (val: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(val))
    router.push(`${pathname}?${params}`)
  }
  return (
    <>
    {data.length > 0 ?
    <>
      <div className="flex flex-col items-center gap-10">
      <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {data.map((event, index) => {

          return (
            <li key={event._id} className="flex justify-center">
              <Card event={event} hasOrderLink={false} hidePrice={false} index={index} onDelete={onDelete}/>
            </li>
          )
        })}
      </ul>
    </div>
    <Pagination page={page} totalPages={totalPages} changePage={changePage ? changePage : change} />
    </>
    : <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
    <h3 className="p-bold-20 md:h5-bold">Блин, не повезло</h3>
    <p className="p-regular-14">Контента нет</p>
  </div>
    }
  
        </>

  )
}