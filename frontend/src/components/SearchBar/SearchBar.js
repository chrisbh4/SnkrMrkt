import React, {useState, useEffect} from "react"
import { useDispatch } from "react-redux";

import "./SearchBar.css"



//Pass in shoes to be able to grab it easier??
function SearchBar({shoes, query , setQuery}){
    // const dispatch = useDispatch

    // const [query, setQuery] = useState("");

    let searchBarRegex = new RegExp(query , "i")

    const allShoesIds = Object.keys(shoes)
    // console.log("shoes array", Object(shoes)[2])

    const shoeFilter = ()=>{
        if(query.length > 0){
            let filteredShoes = allShoesIds.map((id)=>{
                console.log("it hits", id)
                console.log("it hits", shoes[id])
                // searchBarRegex.test(shoes[id].title)
            })
            setQuery([filteredShoes])
            return
        }else{
            setQuery("No results")
            return
        }
    }

    // useEffect(async()=>{
    //     let test = () => shoeFilter();
    //     await test()
    // },[shoeFilter])

    const updateQuery = (e) => setQuery(e.target.value);

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
