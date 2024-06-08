import {Routes,Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import Layout from './Layout/layout'
import AuthCallbackPage from './auth/AuthCallbackPage'
import ProtectedRoutes from './auth/ProtectedRoutes'

function App() {

  return (
        <Routes>
        <Route path='/' element={<Layout showHero={true}>
          <HomePage/>
        </Layout>}/>
        <Route path='/auth-callback' element={<AuthCallbackPage/>}/>
        <Route element={<ProtectedRoutes/>}>
        <Route path='/user-profile' element={
          <Layout>
            <ProfilePage/>
          </Layout>
          }/>
        </Route>
        <Route path='*' element={<Navigate to='/'/> }/>
      </Routes>
  )
}

export default App
