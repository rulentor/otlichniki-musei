
import { Button, useDebounce } from "@/shared";
import Link from "next/link";
import HeroLogo from '@/shared/images/hero.png'
import Image from 'next/image'
import Search from "@/widgets/components/Search";
import CategoryFilter from "@/widgets/components/CategoryFilter";
import Collected from "@/features/components/Collected";
import getLatest from "@/features/api/get-latest-events.action";
import getAllMuseums from "@/features/api/get-all-museums.action";
import { useEffect, useState } from "react";
import { IMuseum } from "@/entities/Museum/types";
import { FullEvent } from "@/features/api/get-related-events.action";
import { late } from "zod";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay"
import MuseumCarousel from "@/widgets/components/MuseumCarousel";
import HeroSearch from "@/widgets/components/HeroSearch";
type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
let MuseumData = [{
  title: 'Историко-краеведческий музей',
  description: 'Узнаваемое здание с круглой башенкой, которое находится на проспекте Луначарского, было построено в 1928 году специально для музея.',
  primaryImage: 'https://storage.yandexcloud.net/unilib-storage/test/62bcbffd-2c53-46e3-b5db-8a2acc58f7bb.png',

}, {
  title: 'Музей аптеки',
  description: 'Узнаваемое здание с круглой башенкой, которое находится на проспекте Луначарского, было построено в 1928 году специально для музея.',
  primaryImage: 'https://storage.yandexcloud.net/unilib-storage/test/62bcbffd-2c53-46e3-b5db-8a2acc58f7bb.png'
}]
export default async function Home({ searchParams }: SearchParamProps) {
  const museums = await getAllMuseums()
  console.log(museums)
  const events = await getLatest({museum: museums[0].title, limit: 6, page: '1', regex: ''})
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 place-content-center">
        <MuseumCarousel />
      </section> 

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Доверено <br/> десятками мероприятий</h2>

        <HeroSearch museums={museums} initEvents={events.events}/>
      </section>
      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Афиша</h2>
      <h2 className="h2-bold">Последние новости</h2>
      </section>
    </>
  )
}