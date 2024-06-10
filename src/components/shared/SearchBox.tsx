import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
    onSubmit:(formData:SearchForm)=>void
    placeHolder:string;
    onReset?:()=>void;
}
const formSchema = z.object({
    searchQuery:z.string().min(1)
})

export type SearchForm = z.infer<typeof formSchema>;

const SearchBox = ({onSubmit,onReset,placeHolder}:Props) => {
   const form = useForm<SearchForm>({
     resolver:zodResolver(formSchema),
     defaultValues:{
        searchQuery:""
     }
   })
   const HandleReset = ()=>{
      form.reset({
        searchQuery:""
      })
      if(onReset){
        onReset();
    }
   }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={`flex items-center flex-1 justify-between flex-row border-2 rounded-full p-3 mx-5 ${form.formState.errors.searchQuery && " border-red-500"}`}>
           <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block"/>
           <FormField
           control={form.control}
           name="searchQuery"
           render={({field})=>(
            <FormItem className="flex-1">
              <FormControl>
                <Input {...field} 
                className="border-none shadow-none text-xl focus-visible:ring-0"
                placeholder={placeHolder}/>
              </FormControl>
            </FormItem>
           )}/>
            {form.formState.isDirty && (
            <Button type="button" variant="outline" 
            className="rounded-full" onClick={HandleReset}>
               Clear
            </Button>
          )}
          <Button type="submit" className="rounded-full bg-orange-500">
              Submit
          </Button>
          </div>
        </form>
    </Form>
  )
}

export default SearchBox