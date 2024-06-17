"use client"
import {ThemeProvider} from 'next-themes'
import { ReactNode, useEffect, useState } from "react"

export default function ModeProvider({ children }: {children: ReactNode}) {
  let [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return <>{children}</>
  }
  return <ThemeProvider
    attribute='class'
    defaultTheme='system'
    enableSystem
    
  >
    {children}
  </ThemeProvider>
}