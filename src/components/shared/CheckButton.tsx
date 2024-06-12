import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom"
import { Button } from "../ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogTrigger,DialogContent } from "../ui/dialog";
import UserProfileForm, { UserFormData } from "@/Form/User-Profile";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
    onCheckOut:(userFormData:UserFormData)=>void
    disabled:boolean;
    isLoading:boolean
}

const CheckButton = ({onCheckOut,disabled,isLoading}:Props) => {
    const {isAuthenticated,isLoading:isAuthLoading,loginWithRedirect} = useAuth0()
     const {pathname} = useLocation();
     const onLogin = async ()=>{
         await loginWithRedirect({
            appState:{
                returnTo:pathname
            }
         })
     }
     const {CurrentUser,isLoading:isGetUserLoading} = useGetMyUser()
     if(!isAuthenticated || !CurrentUser || isLoading){
        return <Button onClick={onLogin} className=" bg-orange-500 flex-1" >
          Log in to check out
        </Button>
     } 
     if(isAuthLoading){
        return <LoadingButton/>
     }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className=" bg-orange-500 flex-1" disabled={disabled}>
              Go to Checkout
            </Button>
        </DialogTrigger>
        <DialogContent className=" max-w-[425px] md:min-w-[700px] bg-gray-50">
          <UserProfileForm onSave={onCheckOut}
           currentUser={CurrentUser}
            isloading={isGetUserLoading}
            title="Confirm Delivery Details"
            buttonText="Continue to Payment"/>
        </DialogContent>
    </Dialog>
  )
}

export default CheckButton