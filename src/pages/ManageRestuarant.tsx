import ManageRestuarantForm from "@/Form/manage-restuarant-form/Manage-restuarant"
import { CreateRestuarantRequest } from "@/api/MyResturantApi"


const ManageRestuarant = () => {
   const {CreateRestuarant,isLoading} = CreateRestuarantRequest()
  return (
    <ManageRestuarantForm onsave={CreateRestuarant} isLoading={isLoading}/>
  )
}

export default ManageRestuarant