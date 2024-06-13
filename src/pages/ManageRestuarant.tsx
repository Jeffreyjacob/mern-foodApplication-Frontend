import ManageRestuarantForm from "@/Form/manage-restuarant-form/Manage-restuarant"
import { CreateRestuarantRequest, useGetMyRestaurantOrders, useGetMyRestuarant, useUpdateRestuarant } from "@/api/MyResturantApi"
import OrderItemCard from "@/components/shared/OrderItemCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";


const ManageRestuarant = () => {
  const { FetchRestuarant, isLoading: getRestuarantLoading } = useGetMyRestuarant();
  const { CreateRestuarant, isLoading } = CreateRestuarantRequest();
  const { UpdateRestuarant, isLoading: updateRestuarantLoading } = useUpdateRestuarant();
  const { RestaurantOrders} = useGetMyRestaurantOrders();
  if (getRestuarantLoading) {
    return <span>Loading...</span>
  }
  const IsEditing = !!FetchRestuarant;
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className=" space-y-5 bg-gray-50 rounded-lg p-10">
        <h2 className=" text-2xl font-bold">{RestaurantOrders?.length} active orders</h2>
        {RestaurantOrders?.map((order) => <OrderItemCard order={order} />)}
      </TabsContent>
      <TabsContent value="manage-restaurant" className="space-y-5">
        <ManageRestuarantForm
          Restuarant={FetchRestuarant}
          onsave={IsEditing ? UpdateRestuarant : CreateRestuarant}
          isLoading={isLoading || updateRestuarantLoading} />
      </TabsContent>
    </Tabs>
  )
}

export default ManageRestuarant