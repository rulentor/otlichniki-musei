"use client"
import { Button } from "@/shared"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from "react"
import { IMuseum } from "@/entities/Museum/types"
import HeroLogo from '@/shared/images/hero.png'
export default function DataCarousel({data}: {data: IMuseum[]}) {
  let [isLoading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
  }, [])
  return (
    <Carousel plugins={[
      Autoplay({
        delay: 2000,
      }),
    ]}>
      <CarouselContent>
      <CarouselPrevious />
        {data.map((el) => 
        <CarouselItem>
          <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 mt-3">
          <div className="flex flex-col justify-center gap-8 place-content-center">
            <h1 className="h1-bold">{el.title}</h1>
            <p className="p-regular-20 md:p-regular-24">{el.description}</p>
            <div className="flex flex-row gap-4">
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
                Афиша
              </Link>
            </Button>
            <Button size='lg' asChild className="button w-full sm:w-fit bg-red-500">
            <Link href="#events">
                Подробнее
              </Link>
            </Button>
            </div>

          </div>

          {!isLoading && <Image 
            src={el.primaryImage}
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />}
        </div>
        </CarouselItem>
        )}
    
    </CarouselContent>
  </Carousel>
  )
}