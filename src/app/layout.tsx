import "./globals.css";
import { AuthProvider, ModeProvider} from "@/shared";
import { Metadata } from "next";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})
export const metadata: Metadata = {
  title: 'Smth',
  description: 'Some title',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
        <html lang="en">
          <body className={poppins.variable}>
            {/* <ModeProvider> */}
              {children}
            {/* </ModeProvider>   */}
          </body>
        </html>
    </AuthProvider>
  );
}
