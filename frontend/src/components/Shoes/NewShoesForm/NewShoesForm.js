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
    const allShoes = useSelector((state)=> state?.shoes)

    // useEffect(()=>{
    //     dispatch(getAllShoes())
    // },[dispatch])

    let arrayOfShoes = Object.keys(allShoes)
    let lastShoeId = arrayOfShoes[arrayOfShoes.length -1];
    let newShoeId = Number(lastShoeId) + 1
    console.log("here:", arrayOfShoes)
    console.log("next:", lastShoeId)
    console.log("last:", newShoeId)

    const [title, setTitle] = useState("")
    const [shoeSize, setShoeSize] = useState(0)
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [description , setDescription] = useState("")
    const [price, setPrice] = useState(0.00)
    const [errors, setErrors] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value)
    const updateShoeSize = (e) => setShoeSize(e.target.value)
    const updateImage = (e) => setImage(e.target.value)
    const updateBrand = (e) => setBrand(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateDescription= (e) => setDescription(e.target.value)


    const onSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(getCreatedShoe(sellerId, title, shoeSize, image, price, brand, description))

        if (!data?.errors) {

            // TODO: Create User Profile and redirect user to show new shoe being listed under them

            history.push(`/shoes/${newShoeId}`)
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
            <div className="form-container">
                <form onSubmit={onSubmit}>
                    {errors.map((error) => {
                        if (error) {
                            return (
                                <p key={error.id}>{error}</p>
                            )
                        }
                        // might cause error || new add
                        return null;
                    })}
                    <div className="form-item">
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
                    <div className="form-item-new">
                        <label>Description: </label>
                       <textarea
                        onChange={updateDescription}
                       >
                       </textarea>
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
