import React from "react"
import { useState } from "react"
import { useSelector, useDispatch ,  } from "react-redux"

import { getCreatedShoe } from "../../../store/shoes.js"
import { useNavigate } from "react-router-dom"
import "./NewShoeForm.css"



function NewShoesForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sellerId = useSelector((state) => state.session.user.id)

    const [title, setTitle] = useState("")
    const [shoeSize, setShoeSize] = useState(0)
    // const [image, setImage] = useState("")
    const [imageFile, setImageFile] = useState("")
    const [brand, setBrand] = useState("")
    const [description , setDescription] = useState("")

    const [price, setPrice] = useState(0.00)
    const [errors, setErrors] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value)
    const updateShoeSize = (e) => setShoeSize(e.target.value)
    // const updateImage = (e) => setImage(e.target.value)
    const updateImageFile = (e) => setImageFile(e.target.files[0])
    const updateBrand = (e) => setBrand(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateDescription= (e) => setDescription(e.target.value)


    const onSubmit = async (e) => {
        e.preventDefault();
        let payload = {sellerId, title, shoeSize, imageFile, price, brand, description}
        const data = await dispatch(getCreatedShoe(payload))
        // const data = await dispatch(getCreatedShoe(sellerId, title, shoeSize, imageFile, price, brand, description))
        if (!data?.errors) {

            // TODO: Create User Profile and redirect user to show new shoe being listed under them
            navigate(`/home`)
             alert("Your Shoe has now been listed for sale.")
        }
        else {
            setErrors(data?.errors)
        }
        return data
    }

    return (
        <>

        </>
    )
}



export default NewShoesForm
