import React , {useState} from "react";
import { useSelector } from "react-redux";
// import { getAllShoes } from "../../store/shoes";
import ShoeList from "./ShoeList";

function HomePage(){


    // const shoesObject = useSelector((state)=> state.shoes.Array)
    const shoes= useSelector((state)=> state.shoes)
    console.log('HomePage')
    // I'm able to access the array but can't map through it
    console.log('All shoes:', shoes)
    console.log('shoes:', shoes[1])

    // console.log(Object(shoes))
    // const shoes = Object(shoesObject)
    // dispatch(getAllShoes(shoes))
    return(
        <>
        <div className="all-shoes-container">
            {/* {shoes.map((shoe)=>(
                <ShoeList key={shoe.id} shoe={shoe} />
            ))} */}
        </div>
        </>

    )

}


export default HomePage
