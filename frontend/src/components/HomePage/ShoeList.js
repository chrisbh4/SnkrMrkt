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

    return (
        <>

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
