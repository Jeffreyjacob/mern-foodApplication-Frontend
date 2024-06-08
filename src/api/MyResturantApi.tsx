import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
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