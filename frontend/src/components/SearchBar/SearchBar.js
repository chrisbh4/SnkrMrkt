import React, { useState } from "react"
import "./SearchBar.css"


// I can split each title be each letter and then join it with a Regex string and add it to every letter and space

//Pass in shoes to be able to grab it easier??
function SearchBar({ shoes }) {

    const [query, setQuery] = useState("");
    const allShoesIds = Object.keys(shoes)
    const updateQuery = (e) => setQuery(e.target.value);


let searchResult = allShoesIds.map((id)=>{

    if (shoes[id].title.toLowerCase().includes(query.toLowerCase())){

        return (
            <div>
            <div className="search-grid">
                <div className="search-col-one">
                <a href={`/shoes/${id}`}>
                    <img src={`${shoes[id].image}`} alt={shoes[id]} />
                    </a>
                </div>

                <div className="search-col-two">
                    <a id="search-shoe" href={`/shoes/${id}`}>
                        {shoes[id].title}
                    </a>

                </div>

            </div>
        </div>
        )
    }else{
        return null
    }
})




    return (

        <div className="searchBar-placement">
            <div className="search-bar-input-container" style={query.length ? {top:"150px", position:"relative" , left:"70px"}: {}}   >
                <input
                    className="searchBar-input"
                    style={{ width: "500px" }}
                    placeholder="Search Shoe Name"
                    type="text"
                    value={query}
                    onChange={updateQuery}
                >
                </input>
            </div>

            {/* Search Result is hidden if query is empty */}
         <div className="results-list-container"  hidden={!query.length }  >
            {searchResult}
        </div>

        </div>


    )
}


export default SearchBar;
