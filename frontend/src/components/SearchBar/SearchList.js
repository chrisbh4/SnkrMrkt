import React from "react";
import "./SearchBar.css"


/*
    TODO: Images and title aren't showing but alt for image is rendering
        [] render images and title
        [] container only appears when searchedShoes has data
        [] container hides when it has no data searched


*/


 function SearchList({searchId, searchedShoes}){


    //  console.log("shoesss: " ,searchedShoes.title)
    //  console.log("search id " ,searchId)
    return(
        <div
        // style={{color:"white", position:"realtive", top:"150px"}}
        >
        <div className="search-grid">
            <div className="search-col-one">
            <a href={`/shoes/${searchId}`}>
                <img src={`${searchedShoes.image}`} alt={searchedShoes[searchId]} />
                </a>
            </div>

            <div className="search-col-two">
                <a id="search-shoe" href={`/shoes/${searchId}`}>
                    {searchedShoes.title}
                </a>
                {/* <a href={`/shoes/${searchId}`}>
                    {searchedShoes[searchId]?.title}
                </a> */}
            </div>

        </div>
    </div>
    )
}



export default SearchList;
