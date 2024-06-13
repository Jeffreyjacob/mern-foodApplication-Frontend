/* eslint-disable react-refresh/only-export-components */
import { Order, Restuarant } from "@/lib/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CreateRestuarantRequest = ()=>{
    const {getAccessTokenSilently} = useAuth0()
      const createRestuarant = async (restuarantFormData:FormData)=>{
        const accessToken = await getAccessTokenSilently()
        try{
             const response = await fetch(`${API_BASE_URL}/api/v1/restuarant`,{
                method:"POST",
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                },
                body:restuarantFormData
             });
              if(!response.ok){
                throw new Error("Failed to create restuarant")
              }
              return response.json();
        }catch(error){
           console.log(error)
        }
      }
      const {mutate:CreateRestuarant,isLoading,error,isSuccess} = useMutation(createRestuarant)
      if(isSuccess){
        toast.success("Restuarant created!");
      }
      if(error){
        toast.error("unable to create restaurant");
      }
    return {CreateRestuarant,isLoading}
}

export const useGetMyRestuarant = ()=>{
    const {getAccessTokenSilently} = useAuth0()
    const getRestuarant = async ():Promise<Restuarant | undefined> =>{
        const accessToken  = await getAccessTokenSilently()
        try{
            const response = await fetch(`${API_BASE_URL}/api/v1/restuarant`,{
             method:"GET",
             headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
             }
            })
            if(!response.ok){
                throw new Error("Error whiling getting restuarant")
            }
            return response.json();
        }catch(error){
           console.log(error)
        }
    }
    const {data:FetchRestuarant,isLoading,error} = useQuery("fetchRestuarant",getRestuarant)
    if(error){
        toast.error("Unable to fetch restuarant")
    }
    return {FetchRestuarant,isLoading}
}


export const useUpdateRestuarant = ()=>{
    const {getAccessTokenSilently} = useAuth0();
    const updateRestuarantRequest = async(restuarantFormData:FormData):Promise<Restuarant | undefined> =>{
          const accessToken  = await getAccessTokenSilently()
          try{
          const response = await fetch(`${API_BASE_URL}/api/v1/restuarant`,{
              method:"PUT",
              headers:{
                Authorization: `Bearer ${accessToken}`
              },
              body:restuarantFormData
          })
          if(!response.ok){
             throw new Error("Failed to update restuarant")
          }
          return response.json()
        }catch(error){
            console.log(error)
        }
    }
    const {mutate:UpdateRestuarant,isLoading,error,isSuccess} = useMutation(updateRestuarantRequest)
    if(isSuccess){
        toast.success("Restuarant Updated");
    }
    if(error){
        toast.error("Unable to upddate restuarant");
    }
    return {UpdateRestuarant,isLoading}
}

export const useGetMyRestaurantOrders = ()=>{
    const {getAccessTokenSilently} = useAuth0();
    const getMyRestaurantOrdersRequest = async ():Promise<Order[]>=>{
      const accessToken = await getAccessTokenSilently()
     const response = await fetch(`${API_BASE_URL}/api/v1/restuarant/order`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
     })
     if(!response.ok){
      throw new Error("Failed to fetch restuarant order")
     }
     return response.json()
    }  
    const {data:RestaurantOrders,isLoading,error} = useQuery("fetchRestaurantOrders",getMyRestaurantOrdersRequest)
    if(error){
      toast.error("Unable to fetch order")
    }
    return{RestaurantOrders,isLoading}
}

type UpdateOrderStatusRequest = {
  orderId:string;
  status:string;
}

export const useUpdateMyRestaurantOrder = ()=>{
  const {getAccessTokenSilently} = useAuth0();
  const updateMyRestaurantOrder = async (updateStatusOrderRequest:UpdateOrderStatusRequest)=>{
         const accessToken = await getAccessTokenSilently();
         const response = await fetch(`${API_BASE_URL}/api/v1/restuarant/order/${updateStatusOrderRequest.orderId}/status`,{
           method:"PATCH",
           headers:{
            Authorization:`Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
           body:JSON.stringify({ status: updateStatusOrderRequest.status })
         });
         
         if(!response.ok){
          throw new Error("Failed to update Status")
         }
         return response.json()
  };
  const {mutateAsync:updateRestaurantStatus,isLoading,isError,isSuccess,reset} = useMutation(updateMyRestaurantOrder)
  if(isSuccess){
    toast.success("Order updated")
  }
  if(isError){
    toast.error("Unable to update order")
    reset()
  }
  return {updateRestaurantStatus,isLoading}
}

