import { Sheet, SheetContent, SheetTrigger, Separator } from "@/shared"
import Image from 'next/image'
import MobileLogo from '@/shared/icons/menu.svg'
import SepLogo from '@/shared/images/logo.svg'
import NavItems from "./NavItems"
const MobileNav = ({headerLinks}: {headerLinks: any}) => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image src={MobileLogo} alt="menu" width={24} height={24} className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Image src={SepLogo} alt="logo" width={128} height={38} />
          <Separator className="border border-gray-50" />
          <NavItems headerLinks={headerLinks}/>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
export default MobileNav