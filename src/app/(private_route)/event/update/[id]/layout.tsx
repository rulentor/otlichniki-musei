import { UpdateForm } from "@/widgets";
import { ReactNode } from "react";

export default async function PrivateLayout({params: {id}}: {params: {id: string}}) {
 return <>
  <UpdateForm eventId={id} />
 </>
}