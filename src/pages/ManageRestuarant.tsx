import ManageRestuarantForm from "@/Form/manage-restuarant-form/Manage-restuarant"
import { CreateRestuarantRequest, useGetMyRestuarant } from "@/api/MyResturantApi"


const ManageRestuarant = () => {
   const {FetchRestuarant,isLoading:getRestuarantLoading}= useGetMyRestuarant();
   const {CreateRestuarant,isLoading} = CreateRestuarantRequest()
   if(getRestuarantLoading){
     return <span>Loading...</span>
   }
   if(!FetchRestuarant){
    return <span>Unable to fetch restuarant</span>
   }

  return (
    <ManageRestuarantForm 
    Restuarant={FetchRestuarant}
    onsave={CreateRestuarant}
     isLoading={isLoading}/>
  )
}

export default ManageRestuarant