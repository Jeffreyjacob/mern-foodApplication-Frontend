import { Link } from 'react-router-dom'
import MobielNav from './MobielNav'
import MainNav from './MainNav'

const Header = () => {
  return (
    <div className='border-b-2 border-b-orange-500 py-6'>
       <div className='container mx-auto flex justify-between items-center'>
         <Link className='text-3xl font-bold tracking-tight text-orange-500' to='/'>
            MernEats.com
         </Link>
          {/**mobile nav */}
       <div className='md:hidden'>
       <MobielNav/>
       </div>
       {/**large screen */}
       <div className='hidden md:block'>
        <MainNav/>
       </div>
       </div>
    </div>
  )
}

export default Header