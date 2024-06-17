import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import FooterImage from '@/shared/images/logo.svg'
const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href='/'>
          <Image src={FooterImage} alt='logo' width={128} height={38} />
        </Link>
        <p>Все права типо защищены</p>
      </div>
    </footer>
  )
}

export default Footer