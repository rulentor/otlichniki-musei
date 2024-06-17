import { Button } from "@/shared";
import Link from "next/link";
import HeroLogo from '@/shared/images/hero.png'
import Image from 'next/image'
import Search from "@/widgets/components/Search";
import CategoryFilter from "@/widgets/components/CategoryFilter";
import Collected from "@/features/components/Collected";
type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Музеи</h1>
      
          </div>

        </div>
      </section> 

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">

        <Collected />
      </section>
    </>
  )
}