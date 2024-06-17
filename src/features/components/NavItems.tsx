'use client';

import { unathenticatedHeaderLinks, athenticatedHeaderLinks, museumHeaderLinks } from '@/entities/User/constants/headerLinks';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const NavItems = ({headerLinks}: {headerLinks: any}) => {
  const pathname = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link: any) => {
        const isActive = pathname === link.route;
        
        return (
          <li
            key={link.route}
            className={`${
              isActive && 'text-primary-500'
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems