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
    // const regex = /[^\w\s]/i;
    const regex = "i";
    const searchBarRegex = new RegExp(query,regex)

    const allShoesIds = Object.keys(shoes)

    // Orignal Shoe Filter
    // const shoeFilter = () => {
    //     if (query.length > 0) {
    //         let filteredShoes = allShoesIds.filter((id) => {
    //             // let filteredShoes = allShoesIds.map((id)=>{
    //             //* .map allows me to get the titles but filter does not , does filter only return the orgianl list ???
    //             // console.log("it hits", id)
    //             // console.log("shoes: ", shoes[id].title)
    //             if (searchBarRegex.exec(shoes[id].title)) {
    //                 if (!searchQuery.includes(id)) {
    //                     // console.log("here:",shoes[id].title)
    //                     return shoes[id].title
    //                 } else {
    //                     return null
    //                 }
    //                 // return shoes[id].title
    //                 return `${shoes[id].title} `

    //             }
    //             // check if this causes error later
    //             return null
    //         })
    //         console.log("filteredShoes:", filteredShoes)
    //         setSearchQuery([...searchQuery, ...filteredShoes])
    //         // setSearchQuery([...filteredShoes])
    //         // setQuery([filteredShoes])
    //         return
    //     } else {
    //         // setQuery("")
    //         setSearchQuery([]);
    //         return
    //     }
    // }


// new shoe filter

/*

    - check to see if each id is being hit id doubleFilter
    - see what is being pushed and what is being returned
    - has to be coming from the helper function since the searchQuery only registers when it uses filter and not betterQuery
*/

// Helper Function
let doubleFilter =  (results) =>{
    let finalFilter = [];
    for(let i = 0; i < results.length; i++){
        let firstId = results[i];
        console.log("first loop :",firstId)
        // console.log("shoe loop :",shoes[firstId].title)
        // might need to be one to start one ahead of the begining loop
        for( let x = 0; x < results.length[i+1]; x++){
            let secondId = results[x];
            console.log("second loop :",secondId)
            if ( firstId === secondId){
                console.log(firstId)
                finalFilter.push(firstId)
                return
            }
        }
    }

    console.log("final filter :" , finalFilter)
    return finalFilter

}

const shoeFilter = () => {
    if (query.length > 0) {
        let filteredShoes = allShoesIds.filter((id) => {
            // let filteredShoes = allShoesIds.map((id)=>{
            //* .map allows me to get the titles but filter does not , does filter only return the orgianl list ???
            // console.log("it hits", id)
            // console.log("shoes: ", shoes[id].title)
            if (searchBarRegex.exec(shoes[id].title)) {
                if (!searchQuery.includes(id)) {
                    // console.log("here:",shoes[id].title)
                    return shoes[id].title
                } else {
                    return null
                }

            }
            // check if this causes error later
            return null
        })

        let betterQuery = doubleFilter(filteredShoes);

        console.log("better query :",betterQuery);

        // console.log("query", betterQuery)
        // console.log("filteredShoes:", filteredShoes)


        // setSearchQuery([...searchQuery, ...filteredShoes])
        setSearchQuery([...searchQuery, ...betterQuery])
        // setSearchQuery([...betterQuery])


        // setSearchQuery([...filteredShoes])
        // console.log("filter :", filteredShoes)

        // setSearchQuery([...filteredShoes])
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
