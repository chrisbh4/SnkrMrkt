import React from "react";
import "./SearchBar.css"





 function SearchList({searchId, shoes}){


     console.log("shoesss: " ,shoes)
     console.log("search id " ,searchId)
    return(
        <div
        // style={{color:"white", position:"realtive", top:"150px"}}
        >
        <div className="search-grid">
            <div className="search-col-two">
                <img src={`${shoes[searchId]?.image}`} alt="shoes title" />
            </div>

            <div className="search-col-one">
                <a href={`/shoes/${searchId}`}>
                    {shoes[searchId]?.title}
                </a>
            </div>

        </div>
    </div>
    )
}



export default SearchList;
