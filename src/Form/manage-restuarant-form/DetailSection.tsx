import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"


const DetailSection = () => {
    const {control} = useFormContext()
  return (
    <div className=" space-y-2">
     <div>
        <h2 className=" text-2xl font-bold ">Details</h2>
        <FormDescription>
            Enter the details about your restuarant
        </FormDescription>
     </div>
     <FormField
       control={control}
       name="restaurantName"
       render={({field})=>(
        <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage/>
        </FormItem>
       )}
     />
     <div className=" grid md:grid-cols-2 gap-4">
     <FormField
       control={control}
       name="city"
       render={({field})=>(
        <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
                <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage/>
        </FormItem>
       )}
     />
      <FormField
       control={control}
       name="country"
       render={({field})=>(
        <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
                <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage/>
        </FormItem>
       )}
     />
     </div>
     <FormField
       control={control}
       name="deliveryPrice"
       render={({field})=>(
        <FormItem className="max-w-[25%]">
            <FormLabel>Estimated Delievery Price ($)</FormLabel>
            <FormControl>
                <Input {...field} className="bg-white" placeholder="1.50"/>
            </FormControl>
            <FormMessage/>
        </FormItem>
       )}
     />
     <FormField
       control={control}
       name="estimateDeliveryTime"
       render={({field})=>(
        <FormItem className="max-w-[25%]">
            <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
            <FormControl>
                <Input {...field} className="bg-white" placeholder="30"/>
            </FormControl>
            <FormMessage/>
        </FormItem>
       )}
     />
    </div>
  )
}

export default DetailSection