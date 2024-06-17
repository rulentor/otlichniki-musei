import { LoginForm, RegistrationForm } from "@/widgets"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Инициализация',
  description: 'Unilib - абис нового поколения'
}
const SignIn = () => {
  return (
    <>
      <RegistrationForm />
    </>
  )
}
export default SignIn