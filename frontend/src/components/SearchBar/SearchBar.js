import React, {useState, useEffect} from "react"

import "./SearchBar.css"



//Pass in shoes to be able to grab it easier??
function SearchBar({shoes}){

    const [query, setQuery] = useState("");
    const updateQuery = (e) => setQuery(e.target.value);

    let searchBarRegex = new RegExp(query , "i")

    const allShoesIds = Object.keys(shoes)
    // console.log("shoes array", Object(shoes)[2])

    // const shoeFilter = ()=>{
    //     if(query.length > 0){
    //         let filteredShoes = allShoesIds.map((id)=>{
    //             searchBarRegex.test(shoes[id].title)
    //         })
    //         setQuery([filteredShoes])
    //     }else{
    //         setQuery("No results")
    //     }
    // }

    // useEffect(()=>{
    //     shoeFilter()
    // },[query])


    return(
        <div className="searchBar-placement">

            <input
                className="searchBar-input"
                style={{ width:"500px" }}
                placeholder="Search Shoe Name"
                type="text"
                value={query}
                onChange={updateQuery}
            >

            </input>

        </div>
    )
}


export default SearchBar;
