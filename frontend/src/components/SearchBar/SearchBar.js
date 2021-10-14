import React, { useState, useEffect } from "react"
import SearchList from "./SearchList";
import "./SearchBar.css"




//Pass in shoes to be able to grab it easier??
function SearchBar({ shoes }) {
    // const dispatch = useDispatch();
    const shoeListShoes = shoes
    const [query, setQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState([]);

    const searchBarRegex = new RegExp(query, "i")

    const allShoesIds = Object.keys(shoes)
    // const test = allShoesIds[0]
    // console.log("allShoes", shoes[test].title)
    // console.log("shoes array",allShoesIds)
    // console.log("shoes array 2:", Object.entries(shoes))
    // console.log("shoes array 3:", Object.values(shoes))

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
            setSearchQuery([...searchQuery, ...filteredShoes])
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
    // console.log(shoes[searchQuery[3]]?.title)

    /* TODO
    [x] map through the array of titles
    [x] check to see if id or title exists already in the array if not add it else return
    [] display list of titles with image

    */

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



    return (
        // <>
        // <div className="searchBar-placement">

        //     <div className="search-bar-input-container">
        //         <input
        //             className="searchBar-input"
        //             style={{ width: "500px" }}
        //             placeholder="Search Shoe Name"
        //             type="text"
        //             value={query}
        //             onChange={updateQuery}
        //         >
        //         </input>
        //     </div>


        // </div>

        //  {/* <div className="results-list-container">
        //     {query.length ? resultsDropList : null}
        // </div> */}

        // </>



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

        <div className="searchBar-placement">
{/* grid area: "search-bar
                results"


                */}
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



         <div className="results-list-container"  hidden={!query.length}>
            {resultsDropList}
        </div>

        </div>


    )
}


export default SearchBar;
