import React from "react";



function ShoeList({shoe}){


    return(
        <>
            <div className="shoe-container" key={shoe.id}>
                <div>
                    <h1>{shoe.title}</h1>
                </div>
            </div>
        </>
    )
}


export default ShoeList
