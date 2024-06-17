import { UserAuthForm, UserRegisterForm } from "@/features";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, cn } from "@/shared";
import Link from "next/link";
import Image from "next/image";

export default function RegistrationForm() {
  return (
    <>
      <div className="w-full lg:grid  lg:grid-cols-2 min-h-screen ">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r order-2">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px] lg:w-[500px] md:w-[650px] xl:w-[600px]">
            <div className="flex items-center justify-center py-10 flex-col mt-[170px] pl-3 pr-3">
              <Card className='mx-auto min-w-[100px]'>
                <CardHeader className="flex items-center">
                  <CardTitle className="text-2xl font-semibold tracking-tight">
                    Регистрация
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Введите никнейм и пароль чтобы войти в аккаунт
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col py-2">
                  <UserRegisterForm />
                  <p className="px-8 text-center text-sm text-muted-foreground pt-4 pb-5">
                Уже есть аккаунт?{" "}
                
                <Link
                  href="/sign-in"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Войдите
                </Link>
                .
              </p>
            </CardContent>
            </Card>
          </div>
        </div>
        <div className="hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1000}
          height={1000}
          alt="Authentication"
          className="block dark:hidden sm:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1000}
          height={1000}
          alt="Authentication"
          className="hidden dark:block sm:hidden"
        />
      </div>
      </div>
      </div>
    </>
  )
}