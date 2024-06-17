import { Alert, AlertDescription, AlertTitle } from "@/shared"
import {AlertCircle} from 'lucide-react'
const DestructiveAlert = ({title, description}: {title: string, description: string}) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
export default DestructiveAlert