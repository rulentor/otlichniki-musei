

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { Input } from '@/shared';
import SearchLogo from '@/shared/icons/search.svg'
const Search = ({ placeholder = 'Найти по названию', value, onChange }: { placeholder?: string, value: string, onChange: (str: string) => void }) => {

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Image src={SearchLogo} alt="search" width={24} height={24} />
      <Input 
        type="text"
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export default Search