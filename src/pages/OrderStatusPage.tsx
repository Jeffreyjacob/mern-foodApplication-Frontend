import { useGetMyOrders } from "@/api/OrderApi"
import OrderStatusDetail from "@/components/shared/OrderStatusDetail";
import OrderStatusHeader from "@/components/shared/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";


const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders();
    if (isLoading) {
        return "Loading..."
    }
    if (!orders || orders?.length === 0) {
        return "No Orders Found"
    }
    console.log(orders)
    return (
        <div className=" space-y-10">
            {
                orders.map((orders) => (
                    <div className=" space-y-10 bg-gray-50 p-10 rounded-lg">
                        <OrderStatusHeader order={orders} />
                        <div className=" grid gap-10 md:grid-cols-2">
                          <OrderStatusDetail order={orders}/>
                          <AspectRatio ratio={16/5}>
                            <img
                            src={orders.restaurant.imageUrl}
                            className="rounded-md object-cover h-full w-full"/>
                          </AspectRatio>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default OrderStatusPage