/* eslint-disable react-hooks/rules-of-hooks */import { User } from "@/lib/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


type CreateUSerRequest = {
    auth0Id: string | undefined,
    email: string | undefined,
}

type UpdateUserRequest = {
    name: string,
    addressLine1: string,
    city: string,
    country: string
}

export const userCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()
    const createMyUserRequest = async (user: CreateUSerRequest) => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/v1/auth`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("Failed to create user")
        }
    }
    const {
        mutateAsync: CreateUser,
        isLoading,
        isError,
        isSuccess
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useMutation(createMyUserRequest)
    return { CreateUser, isLoading, isError, isSuccess }
}

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    const updatingUser = async (data: UpdateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/ap1/v1/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error("something went wrong,unable to update user")
        }
    }
    const { mutateAsync: updateUser, isSuccess, isLoading, error, reset } = useMutation(updatingUser)
    if (isSuccess) {
        toast.success("User profile updated!")
    }
    if (error) {
        toast.error(error.toString())
        reset()
    }
    return { updateUser, isSuccess, isLoading }
}

export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()
    const getUserRequest = async ():Promise<User> => {
        const accesstoken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/ap1/v1/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                "Content-Type": "application/json"
            }
        });
        if (!response) {
            throw new Error("Failed to fetch user")
        }
      return response.json()
    }
   const {data:CurrentUser,isLoading,error} = useQuery("fetchCurrentUser",getUserRequest)
   if(error){
    toast.error(error.toString())
   }
   return {CurrentUser,isLoading}
}