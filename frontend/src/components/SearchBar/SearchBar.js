import React, {useState, useEffect} from "react"
import { useDispatch } from "react-redux";

import "./SearchBar.css"



//Pass in shoes to be able to grab it easier??
function SearchBar({shoes}){
    // const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const [searchQuery , setSearchQuery] = useState([]);

    const searchBarRegex = new RegExp(query , "i")

    const allShoesIds = Object.keys(shoes)
    // const test = allShoesIds[0]
    // console.log("allShoes", shoes[test].title)
    // console.log("shoes array",allShoesIds)
    // console.log("shoes array 2:", Object.entries(shoes))
    // console.log("shoes array 3:", Object.values(shoes))

    const shoeFilter = ()=>{
        if(query.length > 0){
            let filteredShoes = allShoesIds.filter((id)=>{
                // console.log("it hits", id)
                // console.log("shoes: ", shoes[id].title)
                if(searchBarRegex.test(shoes[id].title)){
                    if( !searchQuery.includes(id)){
                        return shoes[id].title
                    }else{
                        return null
                    }
                    // return shoes[id].title
                }

            })
            console.log("filteredShoes:",filteredShoes)
            setSearchQuery([...searchQuery, ...filteredShoes])
            // setQuery([filteredShoes])
            return
        }else{
            // setQuery("")
            return
        }
    }


    // useEffect(()=>{
    //     let test = () => shoeFilter();
    //     await test()
    // },[shoeFilter])
    useEffect(()=>{
         shoeFilter();
        // test()
    },[query])

    // console.log()
    console.log("search query:",searchQuery)
    console.log(shoes[searchQuery[0]]?.title)

    // const resultsDropList = query.map((shoe)=>{

    // })


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
