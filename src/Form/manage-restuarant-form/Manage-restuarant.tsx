import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import { Separator } from "@/components/ui/separator";
import CuisineForm from "./CuisineForm";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    restaurantName: z.string({ required_error: "restuarant name is required" }),
    city: z.string({ required_error: "City is required" }),
    country: z.string({ required_error: "Country is required" }),
    deliveryPrice: z.coerce.number({ required_error: "delivery price is requires", invalid_type_error: "must be a valid number" }),
    estimateDeliveryTime: z.coerce.number({ required_error: "estimated delivery time is requires", invalid_type_error: "must be a valid number" }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select at least one item"
    }),
    menuItem: z.array(z.object({
        name: z.string().min(1, "name is requires"),
        price: z.coerce.number().min(1, "price is required")
    })),
    imageFile: z.instanceof(File, { message: "image is required" })
});
type Props = {
    onsave: (restuarantFormData: FormData) => void;
    isLoading: boolean;
}

type RestuarantFormData = z.infer<typeof formSchema>

const ManageRestuarantForm = ({ onsave,isLoading}: Props) => {
    const form = useForm<RestuarantFormData>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            cuisines:[],
            menuItem:[{name:"",price:0}],
        }
    })
    const onSubmit = (values:RestuarantFormData)=>{
        const formData = new FormData()
        formData.append("restaurantName",values.restaurantName);
        formData.append("city",values.city);
        formData.append("country",values.country);
        formData.append("deliveryPrice",(values.deliveryPrice * 100).toString());
        formData.append("estimateDeliveryTime",values.estimateDeliveryTime.toString())
        formData.append("imageFile",values.imageFile)
        values.cuisines.forEach((cuisine,index)=>{
           formData.append(`cuisines[${index}]`,cuisine);
        })
        values.menuItem.forEach((menuItems,index)=>{
            formData.append(`menuItem[${index}][name]`,menuItems.name);
            formData.append(`menuItem[${index}][price]`,(menuItems.price * 100).toString())
        })
        onsave(formData)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8 bg-gray-50 p-10 rounded-lg ">
               <DetailSection/>
               <Separator/>
               <CuisineForm/>
               <Separator/> 
               <MenuSection/>
               <Separator/>
               <ImageSection/>
               {
                isLoading ? <Button className=" bg-orange-500 flex gap-2" disabled>
                   <Loader2/>
                   Loading...
                </Button>:(
                    <Button type="submit" className=" bg-orange-500">
                      Submit
                    </Button>
                )
               }
            </form>
        </Form>
    )
}

export default ManageRestuarantForm