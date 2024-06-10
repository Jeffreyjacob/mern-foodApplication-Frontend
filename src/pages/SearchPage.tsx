import { useSearchRestuarants } from "@/api/MySearchApi"
import PaginationSelector from "@/components/shared/PaginationSelector";
import SearchBox, { SearchForm } from "@/components/shared/SearchBox";
import SearchResultCard from "@/components/shared/SearchResultCard";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export type SearchState = {
    searchQuery:string,
    page:number
}

const SearchPage = () => {
    const {city} = useParams()
    const [searchState,setSearchState] = useState<SearchState>({
        searchQuery:"",
        page:1
    })
    const {results,isLoading} = useSearchRestuarants(searchState,city);
   
    if(isLoading){
        <span>Loading...</span>
    }
    if(!results?.data || !city){
        return <span>No results found</span>;
    }
    const setPage = (page:number)=>{
      setSearchState((prevState)=>({
         ...prevState,
         page,
      }))
    }
    const setSearchQuery = (searchFormData:SearchForm)=>{
       setSearchState((prevState)=>({
        ...prevState,
        searchQuery:searchFormData.searchQuery,
        page:1
       }))
    }

    const resetSearch = ()=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery:""
           })) 
    }

  return (
   <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
      <div id="cuisine-list">
        insert cuisine here:
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBox 
        searchQuery={searchState.searchQuery}
        onSubmit={setSearchQuery} onReset={resetSearch}
        placeHolder="Search by cuisine or restuarant name"/>
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
        <PaginationSelector page={results.pagination.page} pages={results.pagination.pages}
        onPageChange={setPage}/>
      </div>
   </div>
  )
}

export default SearchPage