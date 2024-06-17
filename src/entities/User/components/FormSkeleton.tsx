import { Skeleton } from "@/shared"

const FormSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      {/* <Skeleton className="h-[110px] w-full" /> */}
      <div className="space-y-2">
        <Skeleton className="h-[50px] w-full" />
        <Skeleton className="h-[50px] w-full" />
      </div>
    </div>
  )
}
export default FormSkeleton