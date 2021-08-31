import React from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getCreatedShoe } from "../../../store/shoes.js"
import { useHistory } from "react-router-dom"
import "./NewShoeForm.css"



function NewShoesForm() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sellerId = useSelector((state) => state.session.user.id)
    // console.log('User Id: ',user)

    const [title, setTitle] = useState("")
    const [shoeSize, setShoeSize] = useState(6)
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [price, setPrice] = useState(0.00)

    const updateTitle = (e) => setTitle(e.target.value)
    const updateShoeSize = (e) => setShoeSize(e.target.value)
    const updateImage = (e) => setImage(e.target.value)
    const updateBrand = (e) => setBrand(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)


    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(getCreatedShoe(sellerId, title, shoeSize, image, price))
        // brand,

        if (!data.errors) {
            // TODO: Create User Profile and redirect user to show new shoe being listed under them
            history.push(`/`)
            throw alert("Your Shoe has now been listed for sale.")
        }
        else {
            // setErros(data)
        }
        return data
    }

    return (
        <div className="form-placement">

            <div className="form-container">
                <form onSubmit={onSubmit}>
                    <div className="form-item">
                        <label>Shoe Title: </label>
                        <input
                            type="text"
                            onChange={updateTitle}
                            name="title"
                            required
                        ></input>
                    </div>
                    <div className="form-item-new">
                        <label>Shoe Size:  </label>
                        <input
                            type="number"
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
                            value="Yeezy-Adidas"
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
                        ></input>
                    </div>
                    <div className="form-item-new">
                        <label>Image Url: </label>
                        <input
                            type="text"
                            onChange={updateImage}
                        ></input>
                    </div>

                    <div className="new-shoe-button">
                        <button>Submit New Listing</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default NewShoesForm
