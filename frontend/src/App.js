import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import * as sessionActions from './store/session'
import Navigation from './components/Navigation'
import AboutPage from './components/AboutPage/AboutPage'
import HomePage from './components/Home/Home'
import ProfilePage from './components/Profile/ProfilePage'
import ShoeDetialsChakra from './components/Shoes/ShoeDetailsPage/index'
import NewReviewChakraForm from './components/Reviews/NewReview'
import EditReviewChakraForm from './components/Reviews/EditReview'
import NewShoeModalForm from './components/Shoes/NewShoesForm/modalForm'
import './index.css'
import CheckoutForm from './components/Cart/NewCart'
import PaymentPage from './components/Profile/payment'
import PurchasedPage from './components/Profile/purchased'
import SellingPage from './components/Profile/selling'
import WatchingPage from './components/Profile/watching'
import StockxApiShoeDetail from './components/Shoes/ShoeDetailsPage/SneaksApiDeatailsPage'

function App () {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  //* Erase inside JSX and only render <Hom
  return (
    <>
      <div>

        <Navigation isLoaded={isLoaded} />
      </div>
      <Routes>

        <Route path='/test' element={<NewShoeModalForm />}> </Route>

        <Route path='/home' element={<HomePage />}> </Route>

        <Route exact path='/shoes/:id' element={<ShoeDetialsChakra />} />

        <Route exact path='/stockx/:id' element={<StockxApiShoeDetail />} />

        <Route exact path='/shoes/:id/reviews/new' element={<NewReviewChakraForm />} />

        <Route path='/reviews/:id/edit' element={<EditReviewChakraForm />} />

        <Route path='/cart' element={<CheckoutForm />} />

        <Route path='/profile' element={<ProfilePage />} />

        <Route path='/payment' element={<PaymentPage />} />

        <Route path='/purchased' element={<PurchasedPage />} />

        <Route path='/sell' element={<SellingPage />} />

        <Route path='/watch' element={<WatchingPage />} />

        <Route path='/' element={<AboutPage />}> </Route>

        <Route>
          404 page not found
        </Route>
      </Routes>
    </>
  )
}

export default App
