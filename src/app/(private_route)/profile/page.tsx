import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { SearchParamProps } from "../event/[id]/layout";
import { getOrdersByUser } from "@/features/api/get-orders-by-user.action";
import getUserId from "@/features/api/get-user-id.action";
import { FullOrder } from "@/entities/Order/types";
import { getEventsByUser } from "@/features/api/get-events-by-user.action";
import { Button } from "@/shared";
import Link from "next/link";
import Collected from "@/features/components/Collected";
import { string } from "zod";

export default async function Profile({ searchParams }: SearchParamProps) {
  const session = await getServerSession(authOptions)
  const token = session?.user?.refreshToken

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;
  const userId = await getUserId(token) as string
  const orders = await getOrdersByUser({userId, page: ordersPage, limit: 6})
  const orderedEvents = orders?.events?.map((order: FullOrder) => order.event) || [];
  console.log(orderedEvents)
  const events = await getEventsByUser({userId, page: eventsPage, limit: 6})
  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Мои мероприятия</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">
              Еще больше мероприятий
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collected
          data={events.events}
          page={eventsPage}
          totalPages={events.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Мои заказы</h3>
          
        </div>
      </section>

      <section className="wrapper my-8">
      <Collected
          data={orderedEvents}
          page={eventsPage}
          totalPages={events.totalPages}
        />
      </section>
    </>
  )
}