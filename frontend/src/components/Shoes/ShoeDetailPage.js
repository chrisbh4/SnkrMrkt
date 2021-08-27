import React from "react"
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux"




function ShoesDetailsPage(){
    const params = useParams()

    const shoeId = params.id
    console.log("Parmas Id: ", shoeId)

    const shoe = (useSelector((state)=> state.shoes))
    const shoeArray = Array(shoe)

     console.log('Shoes :' , shoeArray)


    // const shoeDetail = shoeArray.map((sho)=>{
    //     if (sho.id === shoeId){
    //         return sho
    //     }
    // })

    // console.log('Shoe Details: ',shoeDetail)

    return (
        <>
        <h1>
            Shoes Details Page
        </h1>

        {/* <p>{shoe.title}</p> */}
        </>
    )
}



export default ShoesDetailsPage
