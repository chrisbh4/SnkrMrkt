import React from "react"
import { useState } from "react"
import { useSelector, useDispatch ,  } from "react-redux"

import { getCreatedShoe } from "../../../store/shoes.js"
import { useHistory } from "react-router-dom"
import "./NewShoeForm.css"



function NewShoesForm() {
    const dispatch = useDispatch()
    const history = useHistory()

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
            history.push(`/home`)
             alert("Your Shoe has now been listed for sale.")
        }
        else {
            setErrors(data?.errors)
        }
        return data
    }

    return (
        <div className="form-placement">
             <h1 id="new-shoe-header">
                <a href={`/home`}>New Shoe</a>
            </h1>
            <div className="new-shoe-form-container">
                <form onSubmit={onSubmit}>
                    <div className="new-errors-new-shoe" hidden={!errors.length} >
                    {
                    errors.map((error) => {
                        if (error) {
                            return (
                                <p key={error.id}>{error}</p>
                            )
                        }
                        return null;
                    })
                }
                </div>
                    <div className="form-item-new">
                        <label>Shoe Title: </label>
                        <input
                            type="text"
                            onChange={updateTitle}
                            name="title"
                        ></input>
                    </div>
                    <div className="form-item-new">
                        <label>Shoe Size:  </label>
                        <input
                            type="number"
                            placeholder="Size # in Mens"
                            onChange={updateShoeSize}
                        ></input>
                    </div>
                    <div className="form-item-new">
                        <div>
                            <label>Brand Name: </label>
                        </div>
                        <input
                            type="radio"
                            value="Air-Jordan"
                            onChange={updateBrand}
                            name="brand"
                        ></input>
                        <label for="">Air Jordan</label>
                        <input
                            type="radio"
                            value="Nike"
                            onChange={updateBrand}
                            name="brand"
                        ></input>
                        <label>Nike</label>
                        <input
                            type="radio"
                            value="Yeezy"
                            onChange={updateBrand}
                            name="brand"
                        ></input>
                        <label>Yeezy-Adidas</label>
                        <input
                            type="radio"
                            value="Adidas"
                            onChange={updateBrand}
                            name="brand"

                        ></input>
                        <label>Adidas-Original</label>
                    </div>
                    <div className="form-item-new">
                        <label>Price: $ </label>
                        <input
                            type="number"
                            onChange={updatePrice}
                            placeholder="1.00"
                        ></input>
                    </div>
                    <div className="form-item-new" id="shoes-new-description">
                        <label>Description: </label>
                       <textarea
                       id="shoe-textarea"
                        onChange={updateDescription}
                       >
                       </textarea>
                    </div>
                    <div className="form-item-new">
                        <label>Image Url: </label>
                        <input
                            type="file"
                            onChange={updateImageFile}
                            accept="image/*"
                        ></input>
                    </div>
                    {/*
                    - TODO: add a or selection for either inputing string or files for images

                    <div className="form-item-new">
                        <label>Image Url: </label>
                        <input
                            type="text"
                            onChange={updateImage}
                        ></input>
                    </div>

                    */}
                    <div >
                        <button className="new-shoe-button">Submit New Listing</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default NewShoesForm
