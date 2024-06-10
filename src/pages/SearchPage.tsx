import { useSearchRestuarants } from "@/api/MySearchApi"
import SearchResultCard from "@/components/shared/SearchResultCard";
import { Link, useParams } from "react-router-dom"

const SearchPage = () => {
    const {city} = useParams()
    const {results,isLoading} = useSearchRestuarants(city);
   
    if(isLoading){
        <span>Loading...</span>
    }
    if(!results?.data || !city){
        return <span>No results found</span>;
    }
  return (
   <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
      <div id="cuisine-list">
        insert cuisine here:
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        {/**Search result info*/}
        <div className="flex text-xl font-bold flex-col gap-3 justify-between lg:items-center lg:flex-row">
          <span>
            {results.pagination.total} Resturants found in {city}
            <Link to='/' 
            className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">Change Location
            </Link>
          </span>
          <div>
          insert sort dropdown here
          </div>
        </div>
       
       {/**SearchResult card */}
        {results.data.map((restuarant)=>(
          <SearchResultCard restuarant={restuarant}/>
        ))}
      </div>
   </div>
  )
}

export default SearchPage