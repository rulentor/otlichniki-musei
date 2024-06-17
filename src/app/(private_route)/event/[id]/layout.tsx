import CheckoutButton from '@/features/components/CheckOutButton';
import Collection from '@/features/components/Collection';
import { getEvent } from '@/features/api/get-event.action'
import getRelatedEventsByCategory from '@/features/api/get-related-events.action'
import { formatDateTime } from '@/entities/Event/helpers';
import Image from 'next/image';
import Location from '@/shared/icons/location.svg'
import Calendar from '@/shared/icons/calendar.svg'
import By from '@/features/components/By';
import CreatorUpdate from '@/features/components/CreatorUpdate';
import Museum from '@/shared/images/portrait-ancient-roman-palace.jpg'
import { Phone, PhoneCall } from 'lucide-react';
import getUserId from '@/features/api/get-user-id.action';
import getRelatedEvents from '@/features/api/get-related-events.action';
import Collected from '@/features/components/Collected';
import getUserData from '@/features/api/get-user-data.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import isSubscribed from '@/features/api/is-subscribe.action';
import { Button } from '@/shared';
import Link from 'next/link';
import isOrganizer from '@/features/api/is_organizer.action';
export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const session = await getServerSession(authOptions)
  const token = session?.user?.refreshToken
  const {event, category} = await getEvent({eventId: id});
  console.log(event.days.monday[0])
  console.log('id')
  console.log(id)
  let page = (searchParams?.page as string) || '1'
  const data = await getRelatedEvents({
    category: category,
    eventId: event._id,
    page,
    limit: 3
  })
  const usdata = await getUserData(token)
  console.log('useData')
  console.log(usdata)
  let totalPages = data.totalPages
  let userData = usdata ? usdata : {username: '', name: '', surname: '', patronymic: '', email: '', phone: ''}
  let userId = await getUserId(token)
  console.log('dsff')
  console.log(token, id)
  let subscribed = await isSubscribed({access: token, eventId: id})
  console.log('subs')
  console.log(subscribed)
  let isEventCreator = await isOrganizer({_id: id, access: token})
  // const relatedEvents = await getRelatedEventsByCategory({
  //   category: category,
  //   eventId: event._id,
  //   page: searchParams.page as  string || '1',
  //   limit: 3
  // })

  return (
    <>
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:max-w-7xl">
        <Image 
          src={event.imageURL}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className='h2-bold'>{event.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {event.isFree ? 'Бесплатно' : `$${event.price}`}
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {category}
                </p>
              </div>

              <By eventId={event._id} />
            </div>
          </div>

          <CheckoutButton event={event} eventId={id} userData={userData} InitUserId={userId} initSubscribed={subscribed}/>

          <div className="flex flex-col gap-5">
            <div className='flex gap-2 md:gap-3 '>
              <Image src={Calendar} alt="calendar" width={32} height={32} />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center flex-col justify-center">
                <p>Понедельник:</p>
                {event.days.monday.map((el) =>
            
                <p>{el.startDate} - {' '} {el.endDate}</p>
                  
                )}
                <p>Вторник:</p>
              {event.days.tuesday.map((el) =>
                <p>{el.startDate} - {' '} {el.endDate}</p>
              
              )}
              <p>Среда:</p>
              {event.days.wednesday.map((el) =>
                <p>{el.startDate} - {' '} {el.endDate}</p>
                
              
              )}
              <p>Четверг</p>
              {event.days.thursday.map((el) =>
              <p>{el.startDate} - {' '} {el.endDate}</p>
                
              
              )}
              <p>Пятница</p>
              {event.days.friday.map((el) =>
                <p>{el.startDate} - {' '} {el.endDate}</p>
                
              
              )}
              <p>Суббота</p>
              {event.days.saturday.map((el) =>
                <p>{el.startDate} - {' '} {el.endDate}</p>
                
              
              )}
              <p>Воскресенье</p>
              {event.days.sunday.map((el) =>
                <p>{el.startDate} - {' '} {el.endDate}</p>
                
              
              )}
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image src={Location} alt="location" width={32} height={32} />
              <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
            </div>
            <div className="p-regular-20 flex items-center gap-3">
              <PhoneCall width={25} height={25} />
              <p className="p-medium-16 lg:p-regular-20">{event.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">Описание:</p>
            <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
          </div>
          <CreatorUpdate id={id} isEventCreator={isEventCreator.is_organizer}/>
        </div>
      </div>
    </section>

    {/* EVENTS with the same category */}
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <div className='flex flex-col justify-between md:flex-row items-start'>
        <h2 className="h2-bold mb-2">Также могут понравится</h2>
        <Button asChild className="button rounded-full" size="lg">
            <Link href='/'> На главную</Link>
        </Button>
      </div>

      <Collected data={data.events} page={Number(page)} totalPages={totalPages}/>
      
    </section>
    </>
  )
}

export default EventDetails