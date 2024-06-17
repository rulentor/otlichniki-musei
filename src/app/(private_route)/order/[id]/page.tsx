import { formatDateTime } from "@/entities/Event/helpers"
import getExcelTables from "@/features/api/get-excel-tables.action"
import getOrdersByEvent from "@/features/api/get-orders-by-event.action"
import ParamSearch from "@/features/components/ParamSearch"

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
const Orders = async ({ searchParams, params }: SearchParamProps) => {
  const eventId = params.id
  const searchText = (searchParams?.text as string) || ''

  const orders = await getOrdersByEvent({ eventId, searchString: searchText })
  console.log(orders[0])
  // await getExcelTables({eventId: params.id})
  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left ">Заказы</h3>
      </section>

      <section className="wrapper mt-8">
        <ParamSearch />
      </section>

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">ID заказа</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Название мероприятия</th>
              <th className="min-w-[150px] py-3 text-left">Покупатель</th>
              <th className="min-w-[100px] py-3 text-left">Время</th>
              {/* <th className="min-w-[100px] py-3 text-right">Amount</th> */}
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  Не найдено заказов
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row) => (
                    <tr
                      key={row.order._id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: 'border-box' }}>
                      <td className="min-w-[250px] py-4 text-primary-500">{row.order._id}</td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">{row.event.title}</td>
                      <td className="min-w-[150px] py-4">{row.buyer.name} {row.buyer.surname} {row.buyer.patronymic}</td>
                      <td className="min-w-[100px] py-4">
                        {formatDateTime(row.order.meetDate).dateTime}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Orders
