import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react";
import { User } from "@/lib/type";
import { useEffect } from "react";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    addressLine1: z.string().min(1, "Address line 1 is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required")
})

type Props ={
    onSave:(userFormData: z.infer<typeof formSchema>)=>void,
    isloading:boolean,
    currentUser:User,
    title?:string,
    buttonText?:string
}
// const defaultValueInput = {
//     email: "",
//     name: "",
//     addressLine1: "",
//     city: "",
//     country: ""
// }
export type UserFormData = z.infer<typeof formSchema>;
const UserProfileForm = ({onSave,isloading,currentUser,
    title="User Profile",buttonText="Submit"}:Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser
    })

    useEffect(()=>{
     form.reset(currentUser)
    },[currentUser,form])

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 rounded-lg md:p-10 p-5">
                <div>
                    <h2 className="text-2xl font-bold">
                       {title}
                    </h2>
                    <FormDescription>
                        View and change your profilr information here
                    </FormDescription>
                </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field}  disabled className="bg-white"/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your name" className="bg-white"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className=" grid md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address Line1</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your address" className="bg-white"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your City" className="bg-white"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your Country" className="bg-white"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    </div>
                    <Button type="submit" className=" bg-orange-500"
                    disabled={isloading}>
                        {
                            isloading ? (
                                <div className="flex gap-2">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Loading...
                                </div>
                            ):(<div>
                                {buttonText}
                            </div>)
                        }
                    </Button>

            </form>
        </Form>
    )
}

export default UserProfileForm