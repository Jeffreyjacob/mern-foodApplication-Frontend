import { CuisineList } from "@/lib/restuarantOption";
import { Label } from "../ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "../ui/button";

type Props = {
    onChange:(cuisine:string[])=>void;
    selectedCuisines:string[]
    isExpanded:boolean;
    onExpandedClick:()=> void;
}
const CuisineFilter = ({selectedCuisines,
    onChange,isExpanded,onExpandedClick}:Props) => {
        const handleCuisineReset = () => onChange([]);
       const  handleCuisineChange = (event:ChangeEvent<HTMLInputElement>)=>{
             const clickedCuisine = event.target.value;
             const isChecked = event.target.checked

             const newCuisineList = isChecked ? 
             [...selectedCuisines,clickedCuisine]:
             selectedCuisines.filter((cuisine)=> cuisine !== clickedCuisine);
             onChange(newCuisineList)
       }
  return (
    <>
    <div className="flex justify-between items-center px-2">
      <div className=" text-md font-semibold mb-2">
         Filter By Cuisine
      </div>
      <div className=" text-sm font-semibold mb-2 underline cursor-pointer text-blue-500" onClick={handleCuisineReset}>
        Reset Filters
      </div>
    </div>
    <div className=" space-y-2 flex flex-col">
      {CuisineList.slice(0,isExpanded ? CuisineList.length : 7).map((cuisine,index)=>{
        const isSelected = selectedCuisines.includes(cuisine);
        return (
            <div className=" flex" key={index} >
                <input id={`cuisine_${cuisine}`}
                type="checkbox"
                className="hidden"
                value={cuisine}
                checked={isSelected}
                onChange={handleCuisineChange}
                />
                <Label htmlFor={`cuisine_${cuisine}`}
                className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected} ? 
                "border-2 border-green-600 text-green-600":
                "border-2 border-slate-300"`}>
                   {isSelected && <Check className="text-green-600" size={20} strokeWidth={3}/>}
                   {cuisine}
                </Label>
            </div>
        )
      })}

      {/**button to expand cuisine list */}
      <Button variant="link" className="mt-4 flex-1" onClick={onExpandedClick}>
        {isExpanded ? (<span className="flex flex-row items-center">
            View Less <ChevronUp/>
        </span>):(
           <span className="flex flex-row items-center">
            View More <ChevronDown/>
           </span>
        )}
      </Button>
    </div>
    </>
  )
}

export default CuisineFilter