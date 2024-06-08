import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form"

const MenuSection = () => {
    const {control} = useFormContext();
    const {fields,append,remove} = useFieldArray({
        control,
        name:"menuItem"
    });
  return (
    <div className=" space-y-2">
     <div>
        <h2 className=" text-2xl font-bold">Menu</h2>
          <FormDescription>
            Create your menu and gice each item a name and a price
          </FormDescription>
     </div>
     <FormField
      control={control}
      name="menuItem"
      render={()=>(
        <FormItem className=" flex flex-col gap-2">
            {
                fields.map((_,index)=>(
                  <div className="flex flex-row items-end gap-2">
                     <FormField
                     control={control}
                     name={`menuItem.${index}.name`}
                     render={({field})=>(
                       <FormItem>
                        <FormLabel className="flex items-center gap-1">
                        Name <FormMessage/>
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="cheese pizza"
                            className="bg-white"/>
                        </FormControl>
                       </FormItem>
                     )}
                     />
                      <FormField
                     control={control}
                     name={`menuItem.${index}.price`}
                     render={({field})=>(
                       <FormItem>
                        <FormLabel className="flex items-center gap-1">
                        Price ($) <FormMessage/>
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="8.00"
                            className="bg-white"/>
                        </FormControl>
                       </FormItem>
                     )}
                     />
                     <Button type="button" className="bg-red-500 max-h-fit"
                      onClick={()=>remove(index)}>
                       Remove
                     </Button>
                  </div>
                ))
            }
        </FormItem>
      )}
     />
     <Button type="button" onClick={()=>append({name:"",price:""})}>
        Add Menu Item
     </Button>
    </div>
  )
}

export default MenuSection