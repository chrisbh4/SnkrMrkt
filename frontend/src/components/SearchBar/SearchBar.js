import React, { useState, useEffect } from "react"
import SearchList from "./SearchList";
import "./SearchBar.css"


// I can split each title be each letter and then join it with a Regex string and add it to every letter and space

//Pass in shoes to be able to grab it easier??
function SearchBar({ shoes }) {
    // const dispatch = useDispatch();
    const shoeListShoes = shoes
    const [query, setQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState([]);
    //* need to figure out a regex formula to search and not anaylaze the spaces or mispelling try to get the closest match
    const searchBarRegex = new RegExp(query,"i","\w")

    const allShoesIds = Object.keys(shoes)

    const shoeFilter = () => {
        if (query.length > 0) {
            let filteredShoes = allShoesIds.filter((id) => {
                // let filteredShoes = allShoesIds.map((id)=>{
                //* .map allows me to get the titles but filter does not , does filter only return the orgianl list ???
                // console.log("it hits", id)
                // console.log("shoes: ", shoes[id].title)
                if (searchBarRegex.test(shoes[id].title)) {
                    if (!searchQuery.includes(id)) {
                        // console.log("here:",shoes[id].title)
                        return shoes[id].title
                    } else {
                        return null
                    }
                    // return shoes[id].title

                }
                // check if this causes error later
                return null
            })
            console.log("filteredShoes:", filteredShoes)
            // setSearchQuery([...searchQuery, ...filteredShoes])
            setSearchQuery([...filteredShoes])
            // setQuery([filteredShoes])
            return
        } else {
            // setQuery("")
            setSearchQuery([]);
            return
        }
    }


    // useEffect(()=>{
    //     let test = () => shoeFilter();
    //     await test()
    // },[shoeFilter])
    useEffect(() => {
        shoeFilter();
        // test()
    }, [query])

    // console.log()
    console.log("search query:", searchQuery)



    const resultsDropList = searchQuery.map((id) => {
        // return shoes[id].title
        return (
                <SearchList searchId={id} searchedShoes={shoeListShoes[id]} key={id} />
        )
    })

    // console.log(resultsDropList)

    const updateQuery = (e) => setQuery(e.target.value);


    /*
-create a if statment that checks if query has a length
if true
    - then set the style of "search-bar-input-container" to have :
        -a postion of relative
        - top of 150px to display in the nav when the user types in somethng
else
    - have no style for the search-bar-input-container


*/
/*
-create a if statment that checks if query has a length
if true
- then set the style of "search-bar-input-container" to have :
-a postion of relative
- top of 150px to display in the nav when the user types in somethng
else
- have no style for the search-bar-input-container

make it check if it does have length then set the css properties
*/
    return (

        <div className="searchBar-placement">
            <div className="search-bar-input-container" style={query.length ? {top:"150px", position:"relative"}: {}}>
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
            {/* Results List is hidden if query is empty */}
         <div className="results-list-container"  hidden={!query.length}>
            {resultsDropList}
        </div>

        </div>


    )
}


export default SearchBar;
