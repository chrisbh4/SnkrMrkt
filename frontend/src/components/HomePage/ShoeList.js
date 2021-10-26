import React from "react";
// import { useDispatch } from "react-redux";
// import { getAllShoes } from "../../store/shoes";
import '../HomePage/ShoeList.css'


function ShoeList({ shoe }) {
    // Does not make a difference
    // const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(getAllShoes())
    // },[dispatch])

    let imageCheck;
    if( shoe.image.includes("jpg") || shoe.image.includes("jpeg") || shoe.image.includes("png") || shoe.image.includes("image")){
        imageCheck = <img className="shoe-image" src={shoe.image} alt={shoe.title}></img>
    }else{
        // imageCheck = <img className="bad-image shoe-image" alt={shoe.title}></img>
        imageCheck = <img className="shoe-image" src={`/aws-shoes/${shoe.image}`} alt={shoe.title}></img>

    }

    return (
        <>
         <div>
                        {/* <h2>{shoe.id}</h2> */}
                        <div className="shoe-image-container">
                            {}
                            <a href={`/shoes/${shoe.id}`} >
                                {imageCheck}
                            </a>
                        </div>
                        <div id="homepage-shoe-title"className="shoes-title">
                            <p className="homepage-shoe-title">
                                {shoe.title}
                            </p>

                        </div>
                        <div className="shoes-shoeSize">
                            <h4>{shoe.brand.toUpperCase()}</h4>
                        </div>
                        <div className="shoes-shoeSize">
                            <h4> Size: {shoe.shoeSize}</h4>
                        </div>
                        <div className="shoes-price">
                            <h3>${shoe.price}</h3>
                        </div>
                    </div>



            {/*TODO: Need to add a <a> tag to the shoes image to be able to redirect the
                the user to the single Shoe's details page */}
            {/* <div className="shoe-container" key={shoe.id}>
                <div>
                    <h2>{shoe.id}</h2>
                    <div className="shoes-image">
                        <a href={`/shoes/${shoe.id}`} >
                            <img src={shoe.image} alt={shoe.title}></img>
                        </a>
                    </div>
                    <div className="shoes-title">
                        <h2>{shoe.title}</h2>
                    </div>
                    <div className="shoes-shoeSize">
                        <h4>Shoe Size {shoe.shoeSize}</h4>
                    </div>
                    <div className="shoes-price">
                        <h3>${shoe.price}</h3>
                    </div>
                </div>
            </div> */}
        </>
    )
}


export default ShoeList
