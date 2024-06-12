import { Restuarant } from "@/lib/type"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Dot } from "lucide-react"

type Props = {
    restaurant:Restuarant
}

const RestaurantInfo = ({restaurant}:Props) => {
  return (
    <Card className=" border-slate-400">
       <CardHeader>
         <CardTitle className=" text-3xl font-bold tracking-tight">
           {restaurant.restaurantName}
         </CardTitle>
         <CardDescription>
            {restaurant.city}, {restaurant.country}
         </CardDescription>
         <CardContent className="flex">
            {restaurant.cuisines.map((item,index)=>(
               <span className="flex">
                 <span>{item}</span>
                 {index < restaurant.cuisines.length - 1 && <Dot/>}
               </span>
            ))}
         </CardContent>
       </CardHeader>
    </Card>
  )
}

export default RestaurantInfo