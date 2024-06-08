import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { CuisineList } from "@/lib/restuarantOption";
import { useFormContext } from "react-hook-form"


const CuisineForm = () => {
    const {control} = useFormContext();
  return (
    <div className="space-y-2">
        <div>
            <h2 className=" text-2xl font-bold">Cuisines</h2>
            <FormDescription>
                Select the cuisines that your restaurant serves
            </FormDescription>
        </div>
        <FormField control={control} 
        name="cuisines"
        render={({field})=>(
         <FormItem>
           <div className="grid md:grid-cols-5 gap-1">
             {CuisineList.map((cuisineItem,index)=>
             <FormItem key={index} className=" flex flex-row items-center space-x-1 space-y-0 mt-2">
                 <FormControl>
                    <Checkbox 
                    className="bg-white"
                    checked={field.value?.includes(cuisineItem)}
                    onCheckedChange={
                        (checked)=>{
                         if(checked){
                           field.onChange([...field.value,cuisineItem])
                         }else{
                            field.onChange(field.value.filter((value: string) => value !== cuisineItem));
                         }
                        }
                    }
                    />
                 </FormControl>
                 <FormLabel className="text-sm font-normal">{cuisineItem}</FormLabel>
             </FormItem>
            )}
           </div>
         </FormItem>
        )}/>
    </div>
  )
}

export default CuisineForm