
import { UserFormData } from "@/Form/User-Profile";
import { useGetRestaurantbyId } from "@/api/MySearchApi"
import {useCreateCheckoutSession} from "@/api/OrderApi"
import CheckButton from "@/components/shared/CheckButton";
import MenuItemComp from "@/components/shared/MenuItem";
import OrderSummary from "@/components/shared/OrderSummary";
import RestaurantInfo from "@/components/shared/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { MenuItem } from "@/lib/type";
import { useState } from "react";
import { useParams } from "react-router-dom"

export type CartItem = {
    _id:string,
    name:string,
    price:number,
    quantity:number
}

const DetailPage = () => {
    const  {id} = useParams()
    const {restaurantById,isLoading} = useGetRestaurantbyId(id);
    const {createCheckoutSession,isLoading:isCheckoutLoading} = useCreateCheckoutSession()
    const [cartItems,setCartItems] = useState<CartItem[]>(()=>{
        const storedCartItems = sessionStorage.getItem(`cartItems-${id}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });
    if(isLoading || !restaurantById){
        return "Loading....";
    }
    const addToCart = (menuItem:MenuItem)=>{
        setCartItems((prevsCartitem)=>{
           const existingCartItem = prevsCartitem.find((cartItem)=>cartItem._id === menuItem._id)
        let updatedCardItem;
        if(existingCartItem){
            updatedCardItem = prevsCartitem.map(
                (cartItem)=> cartItem._id === menuItem._id  ? 
             {...cartItem,quantity:cartItem.quantity + 1}: cartItem)
        }else{
            updatedCardItem = [
                ...prevsCartitem,{
                  _id:menuItem._id,
                  name:menuItem.name,
                  price:parseInt(menuItem.price),
                  quantity:1
                }
            ]
        }
          sessionStorage.setItem(`cartItems-${id}`,JSON.stringify(updatedCardItem))
           return updatedCardItem
        })
    }

    const removeFromCart = (cartItem:CartItem)=>{
     setCartItems((prevsCartitem)=>{
        const updatedCartItems = prevsCartitem.filter((item)=> cartItem._id !== item._id)
        sessionStorage.setItem(`cartItems-${id}`,JSON.stringify(updatedCartItems))
        return updatedCartItems
     })
    }
    const onCheckout = async (userFormData:UserFormData)=>{
     const checkoutData = {
        cartItems: cartItems.map((cartItem)=>({
            menuItemId:cartItem._id,
            name:cartItem.name,
            quantity:cartItem.quantity.toString(),
        })),
        restaurantId: restaurantById._id,
        deliveryDetails:{
            name:userFormData.name,
            addressLine1:userFormData.country,
            city:userFormData.city,
            email:userFormData.email as string
        }
     }

      const data = await createCheckoutSession(checkoutData)
      window.location.href = data.url;
    }
  return (
    <div className=" flex flex-col gap-10">
     <AspectRatio ratio={16/5}>
     <img className="rounded-md object-cover h-full w-full" src={restaurantById.imageUrl}/>
     </AspectRatio>
     <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
     <div className="flex flex-col gap-4">
         <RestaurantInfo restaurant={restaurantById}/>
         <span className="text-2xl font-bold tracking-tight">Menu</span>
         {restaurantById.menuItem.map((menuitem)=>(
            <MenuItemComp menuItem={menuitem} addToCart={()=>addToCart(menuitem)}/>
         ))}
     </div>

       < div>
         <Card>
             <OrderSummary restaurant={restaurantById} cartItems={cartItems}
             removeFromCart={removeFromCart}/>
             <CardFooter>
                <CheckButton disabled={cartItems.length === 0} 
                 onCheckOut={onCheckout}
                 isLoading={isCheckoutLoading}/>
             </CardFooter>
         </Card>
       </div>

     </div>
    </div>
  )
}

export default DetailPage
