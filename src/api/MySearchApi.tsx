import { RestuarantSearchResponse } from "@/lib/type";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestuarants = (city?:string)=>{
    const createSearchRequest = async():Promise<RestuarantSearchResponse> =>{
    const response = await fetch(`${API_BASE_URL}/api/restuarant/search/${city}`,
    {
       method:"GET"
    })
    if(!response.ok){
        throw new Error("Failed to get restuarant")
    }
    return response.json();
    };
    const {data:results,isLoading} = useQuery(
        ['searchRestuarant'],
        createSearchRequest,
    {enabled:!!city})
    return {results,isLoading}
}