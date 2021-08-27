import React  from "react";
import { useSelector } from "react-redux";
// import { getAllShoes } from "../../store/shoes";
import ShoeList from "./ShoeList";
import './ShoeList.css'
function HomePage(){


    // const shoesObject = useSelector((state)=> state.shoes.Array)
    const shoes= useSelector((state)=> state.shoes)


    const shoesArray = Object.values(shoes)




    return(
        <>
        <h1 className="homepage-title">ThePlug</h1>
        <div className="all-shoes-container">
            {shoesArray.map((shoe)=>(
                <ShoeList key={shoe.id} shoe={shoe} />
            ))}
        </div>
        </>

    )

}


export default HomePage
