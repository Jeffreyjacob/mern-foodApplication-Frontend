import { CartItem } from "@/pages/DetailPage"
import { CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Separator } from "@radix-ui/react-separator"
import { Restuarant } from "@/lib/type"
import { Trash } from "lucide-react"

type Props = {
    restaurant: Restuarant,
    cartItems: CartItem[],
    removeFromCart: (cartItem: CartItem) => void
}

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
    const getTotalCost = () => {
        const totalInPence = cartItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity, 0
        );
        const totalWithDelivery = totalInPence + restaurant.deliveryPrice

        return (parseInt(totalWithDelivery) / 100).toFixed(2)
    }
    return (
        <>
            <CardHeader>
                <CardTitle className=" text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your Order</span>
                    <span>${getTotalCost()}</span>
                </CardTitle>
                <CardContent className="flex flex-col gap-5">
                    {cartItems.map((item) => (
                        <div className="flex justify-between">
                            <span>
                                <Badge variant="outline" className="mr-2">
                                    {item.quantity}
                                </Badge>
                                {item.name}
                            </span>
                            <span className="flex items-center gap-1">
                                <Trash className=" cursor-pointer"
                                    color="red"
                                    size={20}
                                    onClick={() => removeFromCart(item)} />
                                ${((item.price * item.quantity) / 100).toFixed(2)}
                            </span>
                        </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>${(parseInt(restaurant.deliveryPrice) / 100).toFixed(2)}</span>
                    </div>
                    <Separator />

                </CardContent>
            </CardHeader>
        </>
    )
}

export default OrderSummary