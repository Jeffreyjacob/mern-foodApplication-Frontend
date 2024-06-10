import { useSearchRestuarants } from "@/api/MySearchApi"
import CuisineFilter from "@/components/shared/CuisineFilter";
import PaginationSelector from "@/components/shared/PaginationSelector";
import SearchBox, { SearchForm } from "@/components/shared/SearchBox";
import SearchResultCard from "@/components/shared/SearchResultCard";
import SortOPtionDropdown from "@/components/shared/SortOPtionDropdown";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export type SearchState = {
    searchQuery:string,
    page:number,
    selectedCuisines:string[],
    sortOption:string
}

const SearchPage = () => {
    const {city} = useParams()
    const [searchState,setSearchState] = useState<SearchState>({
        searchQuery:"",
        page:1,
        selectedCuisines:[],
        sortOption:"bestMatch"
    })

    const [isExpanded,setIsExpanded] = useState<boolean>(false);
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

    const setSortOption = (sortOption:string)=>{
        console.log(sortOption)
       setSearchState((prevState)=>({
           ...prevState,
           sortOption,
           page:1,
       }))
    }
    const setSelectedCuisines = (selectedCuisines:string[])=>{
      setSearchState((prevState)=>({
        ...prevState,
         selectedCuisines,
         page:1
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
        <CuisineFilter 
        isExpanded={isExpanded}
        onExpandedClick={()=>setIsExpanded((prevIsExpanded)=> !prevIsExpanded)}
        onChange={setSelectedCuisines}  
        selectedCuisines={searchState.selectedCuisines}/>
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
            <SortOPtionDropdown onChange={setSortOption} sortOption={searchState.sortOption}/>
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