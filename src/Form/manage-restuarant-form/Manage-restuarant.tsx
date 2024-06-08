import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import { Separator } from "@/components/ui/separator";
import CuisineForm from "./CuisineForm";

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

type restuarantFormData = z.infer<typeof formSchema>

const ManageRestuarantForm = ({ onsave,isLoading}: Props) => {
    const form = useForm<restuarantFormData>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            cuisines:[],
            menuItem:[{name:"",price:0}],
        }
    })
    const onSubmit = (values:restuarantFormData)=>{
      console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8 bg-gray-50 p-10 rounded-lg ">
               <DetailSection/>
               <Separator/>
               <CuisineForm/>
            </form>
        </Form>
    )
}

export default ManageRestuarantForm