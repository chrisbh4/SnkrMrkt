import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import AboutPage from './components/AboutPage/AboutPage';
import ShoppingCart from './components/Cart';
import HomePage from './components/Home/Home';
import ProfilePage from './components/Profile/ProfilePage';
import ShoeDetialsChakra from './components/Shoes/ShoeDetailsPage/index';
import NewReviewChakraForm from './components/Reviews/NewReview';
import EditReviewChakraForm from './components/Reviews/EditReview';
import NewShoeModalForm from './components/Shoes/NewShoesForm/modalForm';
import "./index.css"
import CheckoutForm from './components/Cart/NewCart';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);

  //* Erase inside JSX and only render <Hom
  return (
    <>
    <div>

      <Navigation isLoaded={isLoaded}  />
    </div>
      <Routes>

        <Route path="/test" element={<NewShoeModalForm />}> </Route>

        <Route path="/home" element={<HomePage />}> </Route>

        <Route exact path='/shoes/:id' element={<ShoeDetialsChakra />}></Route>

        <Route exact path="/shoes/:id/reviews/new" element={<NewReviewChakraForm />}></Route>

        <Route path="/reviews/:id/edit" element={<EditReviewChakraForm />}></Route>

        <Route path="/cart" element={<CheckoutForm/>}></Route>

        <Route path='/profile' element={<ProfilePage />} ></Route>

        <Route path="/" element={<AboutPage />}> </Route>


        <Route>
          404 page not found
        </Route>
      </Routes>
    </>
  );
}

export default App;
