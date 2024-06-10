import {Routes,Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import Layout from './Layout/layout'
import AuthCallbackPage from './auth/AuthCallbackPage'
import ProtectedRoutes from './auth/ProtectedRoutes'
import ManageRestuarant from './pages/ManageRestuarant'
import SearchPage from './pages/SearchPage'

function App() {

  return (
        <Routes>
        <Route path='/' element={<Layout showHero={true}>
          <HomePage/>
        </Layout>}/>
        <Route path='/auth-callback' element={<AuthCallbackPage/>}/>
        <Route path='/search/:city' element={
          <Layout showHero={false}> 
            <SearchPage/>
          </Layout>
          }/>
        <Route element={<ProtectedRoutes/>}>
        <Route path='/user-profile' element={
          <Layout>
            <ProfilePage/>
          </Layout>
          }/>
           <Route path='/manage-restuarant' element={
          <Layout>
            <ManageRestuarant/>
          </Layout>
          }/>
        </Route>
        <Route path='*' element={<Navigate to='/'/> }/>
      </Routes>
  )
}

export default App
