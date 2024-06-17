
import getAllMuseums from "@/features/api/get-all-museums.action"
import DataCarousel from "./Carousel"

export default async function MuseumCarousel() {
  let MuseumData = await getAllMuseums()
  return (
    <DataCarousel data={MuseumData} />
  )
}