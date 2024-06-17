import { IMuseum } from "@/entities/Museum/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared"


const MuseumFilter = ({data, onChange, defaultValue}: {data: IMuseum[], onChange: (data: string) => void, defaultValue: string}) => {
  return (
      <Select onValueChange={(val) => onChange(val)} defaultValue={defaultValue}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Музеи" />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectItem value="All" className="select-item p-regular-14">All</SelectItem> */}
  
          {data.map((museum) => (
            <SelectItem value={museum.title} key={museum._id} className="select-item p-regular-14" onClick={() => console.log(museum.title)}>
              {museum.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
  )
}
export default MuseumFilter