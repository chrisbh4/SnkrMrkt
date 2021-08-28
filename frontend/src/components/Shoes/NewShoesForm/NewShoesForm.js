import React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"





function NewShoesForm() {

    const user = useSelector((state) => state.session.user.id)
    // console.log('User Id: ',user)


    return (
        <div className="form-container">
            <form>
                <div>
                    <label>Shoe Title: </label>
                    <input
                        type="text"

                        name="title"
                        required
                    ></input>
                </div>
                <div>
                    <label>ShoeSize</label>
                    <input
                        type="number"

                    ></input>
                </div>
                <div>
                    <div>
                        <label>Brand Name: </label>
                    </div>
                    <input
                        type="radio"
                        value="Air-Jordan"
                        name="brand"
                    ></input>
                    <label for="">Air Jordan</label>
                    <input
                        type="radio"
                        value="Nike"
                        name="brand"
                    ></input>
                    <label>Nike</label>
                    <input
                        type="radio"
                        value="Yeezy-Adidas"
                        name="brand"
                    ></input>
                    <label>Yeezy-Adidas</label>
                    <input
                        type="radio"
                        value="Adidas"
                        name="brand"
                    ></input>
                    <label>Adidas-Original</label>
                </div>
                <div>
                    <label>Price: $</label>
                    <input
                        type="number"

                    ></input>
                </div>





                <div className="button-containers">
                    <button>Submit New Listing</button>
                </div>
            </form>
        </div>
    )
}



export default NewShoesForm
