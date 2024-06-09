import ManageRestuarantForm from "@/Form/manage-restuarant-form/Manage-restuarant"
import { CreateRestuarantRequest, useGetMyRestuarant, useUpdateRestuarant } from "@/api/MyResturantApi"


const ManageRestuarant = () => {
   const {FetchRestuarant,isLoading:getRestuarantLoading}= useGetMyRestuarant();
   const {CreateRestuarant,isLoading} = CreateRestuarantRequest();
   const {UpdateRestuarant,isLoading:updateRestuarantLoading} = useUpdateRestuarant();
   if(getRestuarantLoading){
     return <span>Loading...</span>
   }
   if(!FetchRestuarant){
    return <span>Unable to fetch restuarant</span>
   }
  const IsEditing = !!FetchRestuarant;
  return (
    <ManageRestuarantForm 
    Restuarant={FetchRestuarant}
    onsave={IsEditing ? UpdateRestuarant : CreateRestuarant}
     isLoading={isLoading || updateRestuarantLoading}/>
  )
}

export default ManageRestuarant