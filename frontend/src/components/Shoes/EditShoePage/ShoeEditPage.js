import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { getAllShoes, getEditShoe, getDeletedShoe } from "../../../store/shoes"



function EditShoesForm() {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const shoeId = params.id


    useEffect(() => {
        dispatch(getAllShoes())
    }, [dispatch]);


    const shoe = useSelector((state) => state.shoes[shoeId])


    const [title, setTitle] = useState(shoe?.title)
    const [description, setDescription] = useState(shoe?.description)
    const [image , setImage] = useState(shoe?.image)
    const [brand] = useState(shoe?.brand)

    const [errors, setErrors] = useState([])


    const [shoeSize, setShoeSize] = useState(shoe?.shoeSize)
    const [price, setPrice] = useState(shoe?.price)


    const updateTitle = (e) => setTitle(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateShoeSize = (e) => setShoeSize(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updateImage = (e) => setImage(e.target.files[0])


    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(getEditShoe(title, shoeSize, image, price, brand,description, shoeId))
        if (!data.errors) {
            // TODO: Create User Profile and redirect user to show Edited shoe being listed under them
            alert("Your shoe has now been succesfully edited for sale.")
            history.push(`/shoes/${shoeId}`)
        }
        else {
            setErrors(data)
        }
        return data
    }

   let errorHandler;
   if(errors.errors){
      errorHandler = errors.errors.map((error)=>{
               console.log(error)
               return (
                        <p key={error.id}>{error}</p>
                    )
           })
   }
   else{
        errorHandler=null;
   }


    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(getDeletedShoe(shoe.id))
        alert("Shoe has been deleted.");
        history.push('/home')
    }

    return (

        <div className="form-placement">
            <h1 className="page-title">
                <a href={`/shoes/${shoeId}`}>Edit Shoe</a>
            </h1>
            <div className="edit-shoe-form-container">
                <form onSubmit={onSubmit}>
                   {errorHandler}
                    <div className="form-item-edit" >
                        <label>Shoe Title: </label>
                        <input
                            type="text"
                            onChange={updateTitle}
                            placeholder={title}
                            name="title"
                        ></input>
                    </div>
                    <div className="form-item-edit">
                        <label>Shoe Size:</label>
                        <input
                            type="number"
                            placeholder={shoeSize}
                            onChange={updateShoeSize}
                        ></input>
                    </div>
                    <div className="form-item-edit" id="shoes-edit-description" >
                        <label>Description: </label>
                       <textarea
                       id="shoe-textarea"
                        onChange={updateDescription}
                        placeholder={description}
                       >
                       </textarea>
                    </div>
                    <div className="form-item-edit">
                        <label>Price: $</label>
                        <input
                            type="number"
                            placeholder={price}
                            onChange={updatePrice}
                        ></input>
                    </div>

                    {/* Add Image to edit form and add it to the editShoe Store */}
                    <div className="form-item-edit">
                        <label>Image Url: </label>
                        <input
                            type="file"
                            onChange={updateImage}
                            accept="image/*"
                        ></input>
                    </div>

                    {/* <div className="form-item">
                        <label>Image Url:</label>
                        <input
                            type="text"
                            placeholder={image}
                            onChange={updateImage}
                        ></input>
                    </div> */}





                    <div className="button-containers">
                            <button type='submit' className="edit-button">Edit Current Listing</button>
                            <button type='button' className="delete-button" onClick={handleDelete}>Delete Listing</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default EditShoesForm
