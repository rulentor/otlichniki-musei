"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HeaderLogo from '@/shared/images/logo.svg'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { unathenticatedHeaderLinks, athenticatedHeaderLinks, museumHeaderLinks } from '@/entities/User/constants/headerLinks';
import { MobileNav, NavItems } from '@/features'
import { Button } from '@/shared'
import { signOut, useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
const Header =  () => {
  const {status, data} = useSession()
  let role = data?.user?.role
  const onSignOut = async (e: any) => {
    e.preventDefault()
    await signOut()
  }
  return (
    <header className='w-full border-b h-[85px]'>
      <div className='wrapper flex items-center justify-between'>
        <Link href='/' className='w-36 mr-6'>
          <Image src={HeaderLogo} width={128} height={38} alt='monfer logo' />
        </Link>
        {status == 'loading' &&
            <Loader2 className='mr-2 h-14 w-14 animate-spin mb-auto'/>
        } 
        {status== 'authenticated' && data.user?.role == 'user' &&
          <><nav className='md:flex-between hidden w-full max-w-xs'>
          <NavItems headerLinks={athenticatedHeaderLinks}/>
        </nav>
      <div className='flex w-32 justify-end gap-3'>
          <MobileNav headerLinks={athenticatedHeaderLinks}/>
      </div>
      <Button size={'lg'} className='rouded-full' onClick={async e => await onSignOut(e)}>
          Выйти
        </Button> </>
        } 
        {status== 'authenticated' && data.user?.role == 'museum' &&
          <><nav className='md:flex-between hidden w-full max-w-xs'>
          <NavItems headerLinks={museumHeaderLinks}/>
        </nav>
      <div className='flex w-32 justify-end gap-3'>
          <MobileNav headerLinks={museumHeaderLinks}/>
        </div>
        <Button size={'lg'} className='rouded-full' onClick={async e => await onSignOut(e)}>
          Выйти
        </Button> </>
        }
        {status=='unauthenticated' &&
          <><nav className='md:flex-between hidden w-full max-w-xs ml-9'>
          <NavItems headerLinks={unathenticatedHeaderLinks}/>
        </nav>
      <div className='flex w-32 justify-end gap-3'>
          <MobileNav headerLinks={unathenticatedHeaderLinks}/>
        </div> 
        <Button size={'lg'} className='rouded-full'>
          <Link href={'/sign-in'}>
            Войти
          </Link>
        </Button> </>
        }
        
    </div>
          
    </header>
  )
}

export default Header