import { Restuarant, RestuarantSearchResponse } from "@/lib/type";
import { SearchState } from "@/pages/SearchPage";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurantbyId = (restaurantId?:string)=>{
    const getMyRestaurantRequest = async ():Promise<Restuarant> =>{
        const response = await fetch(`${API_BASE_URL}/api/restuarant/${restaurantId}`,{
            method:"GET"
        })
        if(!response.ok){
            throw new Error("Failed to get restaurant");
        }
        return response.json();
    };
    const {data:restaurantById,isLoading} = useQuery("getRestuarantById",getMyRestaurantRequest,{
        enabled:!!restaurantId
    })
    return {restaurantById,isLoading}
}

export const useSearchRestuarants = (searchState:SearchState,city?:string)=>{
    const params = new URLSearchParams();
    params.set("searchQuery",searchState.searchQuery)
    params.set("page",searchState.page.toString());
    params.set("selectedCuisines",searchState.selectedCuisines.join(","))
    params.set("sortOption",searchState.sortOption)
    const createSearchRequest = async():Promise<RestuarantSearchResponse> =>{
    const response = await fetch(`${API_BASE_URL}/api/restuarant/search/${city}?${params.toString()}`,
    {
       method:"GET"
    })
    if(!response.ok){
        throw new Error("Failed to get restuarant")
    }
    return response.json();
    };
    const {data:results,isLoading} = useQuery(
        ['searchRestuarant',searchState],
        createSearchRequest,
    {enabled:!!city})
    return {results,isLoading}
}