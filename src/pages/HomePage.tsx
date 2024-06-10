import LandingImage from '@/assets/landing.png';
import appDownLoadImage from '@/assets/appDownload.png';
import SearchBox, { SearchForm } from '@/components/shared/SearchBox';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate()
  const HandleSubmit = (searchFormValue:SearchForm)=>{
     navigate({
      pathname:`/search/${searchFormValue.searchQuery}`,
     })
  }
  return (
    <div className='flex flex-col gap-12'>
        <div className='md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'>
           <h1 className='text-5xl font-bold tracking-tight text-orange-600'>
             Tuck into a takeway today
           </h1>
           <span className='text-xl'>
              Food is just a click away!
           </span>
           <SearchBox onSubmit={HandleSubmit} placeHolder='Search'/>
        </div>
        <div className='grid md:grid-cols-2 gap-5'>
          <img src={LandingImage} alt='landing'/>
          <div className='flex flex-col items-center justify-center gap-4 text-center'>
              <span className='font-bold text-3xl tracking-tighter'>
                Order takeaway even faster
              </span>
              <span>
                Download the MernEats App for Faster ordering and personalised 
                recommendations
              </span>
              <img src={appDownLoadImage}/>
          </div>
        </div>
    </div>
  )
}

export default HomePage