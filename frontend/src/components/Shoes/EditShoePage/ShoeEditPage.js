import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { getAllShoes, getEditShoe, getDeletedShoe } from "../../../store/shoes"



function EditShoesForm() {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const shoeId = params.id

    //! Does not load anything in or does anything (delete any time)
    //Dispatch gets single shoe
    useEffect(() => {
        dispatch(getAllShoes())
    }, [dispatch]);

    // const user = useSelector((state) => state.session.user.id)

    const shoe = useSelector((state) => state.shoes[shoeId])
    console.log('EDit Shoe ', shoe)


    //! Doesn't make sense to have these but will check will Project Advisor for CRUD
    const [title, setTitle] = useState(shoe?.title)
    const [image] = useState(shoe?.image)
    const [brand] = useState(shoe?.brand)
    const [errors, setErrors] = useState([])

    const [shoeSize, setShoeSize] = useState(shoe?.shoeSize)
    const [price, setPrice] = useState(shoe?.price)

    const updateTitle = (e) => setTitle(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateShoeSize = (e) => setShoeSize(e.target.value)

    // console.log("Price state", price)

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(getEditShoe(title, shoeSize, image, price, brand, shoeId))
        if (!data.errors) {
            // TODO: Create User Profile and redirect user to show Edited shoe being listed under them
            alert("Your shoe has now been succesfully edited for sale.")
            history.push(`/`)
        }
        else {
            setErrors(data)
        }
        return data
    }

    // console.log('delete id:',shoe.id)

    //! Alert and the history.push does't get touched but
    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(getDeletedShoe(shoe.id))

        alert("Shoe has been deleted.");
        history.push('/')
    }

    return (

        <div className="form-placement">
                    {/* <li>errors </li> */}
            <div className="form-container">
                <form onSubmit={onSubmit}>
                    <div className="form-item" >
                        <label>Shoe Title: </label>
                        <input
                            type="text"
                            onChange={updateTitle}
                            placeholder={title}
                            name="title"

                        ></input>
                    </div>
                    <div className="form-item">
                        <label>ShoeSize</label>
                        <input
                            type="number"
                            placeholder={shoeSize}
                            onChange={updateShoeSize}
                        ></input>
                    </div>
                    {/* <div>

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
                </div> */}
                    <div className="form-item">
                        <label>Price: $</label>
                        <input
                            type="number"
                            placeholder={price}
                            onChange={updatePrice}
                        ></input>
                    </div>





                    <div className="button-containers">
                        {/* <div className="edit-button-div"> */}
                            <button type='submit' className="edit-button">Edit Current Listing</button>
                        {/* </div> */}
                        {/* <div className="delete-button-div"> */}
                            <button type='button' className="delete-button" onClick={handleDelete}>Delete Listing</button>
                        {/* </div> */}
                    </div>
                </form>
            </div>
        </div>
    )
}



export default EditShoesForm
