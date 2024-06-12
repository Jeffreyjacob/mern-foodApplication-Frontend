import { MenuItem } from "@/lib/type"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type Props = {
 menuItem:MenuItem,
 addToCart:()=>void
}

const MenuItemComp = ({menuItem,addToCart}:Props) => {
  return (
     <Card className=" cursor-pointer" onClick={addToCart}>
        <CardHeader>
            <CardTitle>{menuItem.name}</CardTitle>
        </CardHeader>
        <CardContent className="font-bold">
          ${(parseInt(menuItem.price)/100).toFixed(2)}
        </CardContent>
     </Card>
  )
}

export default MenuItemComp