import { SearchParamProps } from "@/app/(private_route)/profile/page"
import { LoginForm } from "@/widgets"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Вход в систему',
  description: 'Unilib - абис нового поколения'
}
const SignIn = ({searchParams}: SearchParamProps) => {
  return (
    <>
      <LoginForm username={(searchParams?.username as string) || ''}/>
    </>
  )
}
export default SignIn