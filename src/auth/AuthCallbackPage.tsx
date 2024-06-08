import { userCreateMyUser } from '@/api/MyUserApi';
import { useAuth0 } from '@auth0/auth0-react'
import  { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthCallbackPage = () => {
    const navigate = useNavigate();
  const {user} = useAuth0();
  const {CreateUser} = userCreateMyUser();
  const hasCreatedUser = useRef(false);
  useEffect(()=>{
    if(user?.sub || user?.email && !hasCreatedUser.current){
       CreateUser({auth0Id:user.sub,email:user.email})
       hasCreatedUser.current = true;
    }
    navigate("/")
  },[CreateUser, navigate, user])
  return <>Loading...</>;
}

export default AuthCallbackPage