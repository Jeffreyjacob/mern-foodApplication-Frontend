import UserProfileForm from '@/Form/User-Profile'
import { useGetMyUser, useUpdateMyUser } from '@/api/MyUserApi'


const ProfilePage = () => {
  const {CurrentUser,isLoading:getuserLoading} = useGetMyUser();
  const {updateUser,isLoading} = useUpdateMyUser();
  if(getuserLoading){
    return <span>Loading...</span>
  }
  if(!CurrentUser){
    return <span>Unable to load user profile</span>
  }
  return (
      <UserProfileForm currentUser={CurrentUser} onSave={updateUser} isloading={isLoading}/>
  )
}

export default ProfilePage