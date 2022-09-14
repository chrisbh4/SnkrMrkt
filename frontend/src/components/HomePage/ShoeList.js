import React from "react";
// import { useDispatch } from "react-redux";
// import { getAllShoes } from "../../store/shoes";
import '../HomePage/ShoeList.css'


function ShoeList({ shoe }) {

    let imageCheck;
    if( shoe.image.includes("jpg") || shoe.image.includes("jpeg") || shoe.image.includes("png") || shoe.image.includes("image")){
        imageCheck = <img className="shoe-image" src={shoe.image} alt={shoe.title}></img>
    }else{
        imageCheck = <img className="bad-image shoe-image" alt={shoe.title}></img>

    }

    return (
        <>
                            <a href={`/shoes/${shoe.id}`} >
                        <div className="shoe-image-container">
                                {imageCheck}
                        </div>
                        <div className="shoes-title">
                            <p className="home-shoe-title ">
                                {shoe.title}
                            </p>
                        </div>
                        <div className="shoes-shoeSize">
                            <h4>{shoe.brand.toUpperCase()}</h4>
                        </div>
                        </a>

        </>
    )
}


export default ShoeList
