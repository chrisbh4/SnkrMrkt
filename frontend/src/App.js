import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
// import { Modal } from './context/Modal';
// import { getAllShoes } from './store/shoes';
// import HomePage from './components/HomePage/HomePage';
import NewShoesForm from './components/Shoes/NewShoesForm/NewShoesForm';
import ShoesDetailsPage from './components/Shoes/ShoeDetailsPage/ShoeDetailPage';
import EditShoesForm from './components/Shoes/EditShoePage/ShoeEditPage';
import NewReviewForm from './components/Reviews/NewReview/NewReviewForm';
import EditReviewForm from './components/Reviews/EditReview/EditReviewForm';
import AboutPage from './components/AboutPage/AboutPage';
import ShoppingCart from './components/Cart';
import HomePage from './components/Home/Home';
import ProfilePage from './components/Profile/ProfilePage';
import "./index.css"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);

  //* Erase inside JSX and only render <Hom
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Routes>
        <Route path="/home" element={<HomePage />}> </Route>

        <Route path='/shoes/new' element={<NewShoesForm />}>

        </Route>

        <Route exact path='/shoes/:id' element={<ShoesDetailsPage />}>

        </Route>

        <Route exact path='/shoes/:id/edit' element={<EditShoesForm />}>

        </Route>

        <Route exact path="/shoes/:id/reviews/new" element={<NewReviewForm />}>

        </Route>

        <Route path="/reviews/:id/edit" element={<EditReviewForm />}>

        </Route>
        <Route path="/cart" element={<ShoppingCart />}>
        </Route>

        <Route path='/profile' element={<ProfilePage />} ></Route>


        <Route path="/" element={<AboutPage />}>
        </Route>


        <Route>
          404 page not found
        </Route>
      </Routes>
    </>
  );
}

export default App;
