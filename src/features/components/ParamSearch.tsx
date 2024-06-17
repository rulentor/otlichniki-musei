"use client"
import SearchLogo from '@/shared/icons/search.svg'
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input, useDebounce } from '@/shared'
import Image from 'next/image'
import { useEffect, useState } from 'react';
export default function ParamSearch({placeholder = 'Поиск по имени'}: {placeholder?: string}) {
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    // you can add more keys to this
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  let [value, setValue] = useState('')
  let debouncedValue = useDebounce(value, 500)
  let onChange = () => {
    const params = new URLSearchParams(searchParams);
    params.set('text', value)
    router.push(`${pathname}?${params}`)
  }
  useEffect(() => {
    onChange()
  }, [debouncedValue])
  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Image src={SearchLogo} alt="search" width={24} height={24} />
      <Input 
        type="text"
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}