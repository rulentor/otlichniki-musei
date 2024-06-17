import { ReactNode } from "react";

export default async function PrivateLayout({ children }: {children: ReactNode}) {
  // const session = await getServerSession(authOptions)

  // if(!session?.user) redirect('/sign-in')

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>
      <div className="wrapper my-8">
        {children}
      </div>
    </>
  )
}