import { signin } from "@/features";
import { $api } from "@/shared";
import { getCookie, setCookie } from "cookies-next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
async function refreshToken(token: JWT): Promise<JWT> {
  const res = await $api.post<{accessToken: JWT, refreshToken: JWT, expiresIn: number, role: string}>('/auth/refresh', {refreshToken: token.refreshToken, role: token.role})

  return {
    ...token,
    accessToken: res.data.accessToken
  };
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'text'
        },
        password: {label: 'password', type: 'password'},
        role: {type: 'text'}
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password, role } = credentials;
        console.log('here')
        console.log({ username, password, role })
        const data = await signin(username, password, role)
        if (typeof data == 'string') {
          throw Error(`${data}`)
        }
        console.log(data)
        // setCookie('accessToken', data.accessToken)
        // setCookie('refreshToken', data.refreshToken)
        // setCookie('expiresIn', data.expiresIn)
        // console.log(getCookie('accessToken'))
        
        return {
          role: data.role,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn
        }
      },
      
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) return {...token, ...user}

      // const expiresIn = getCookie('expiresIn')
      if (new Date().getTime() < token.expiresIn) {
        return token
      }
      return await refreshToken(token)
    },
    async session({token, session}) {
      session.user = {...token}
      return session
    },
  }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };