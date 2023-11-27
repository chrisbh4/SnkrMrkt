import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllShoes } from '../../store/shoes'
import ShoeList from './ShoeList'
import './ShoeList.css'
function HomePage () {
  const dispatch = useDispatch()

  const shoes = useSelector((state) => state.shoes)
  // turns the obejct into an array but still don't understand how the keys are iterable now??
  const shoesArray = Object.values(shoes)

  // Start of Image checker but might just need to implement an Regex expression on the backend validator for the new shoe form
  // let shoeImage ;
  // if(shoe.image){
  //     shoeImage = shoe.image
  // }else{
  //     shoeImage = "default"
  // }

  // Loads new State for the HomePage everytime.
  //! Need for Create & Edit feature to be able to auto update the state
  useEffect(() => {
    dispatch(getAllShoes())
  }, [dispatch])

  return (
    <div className='page'>
      {/* <div className="homepage-title-container">
            <Link to="/" id="homepage-title" >ThePlug </Link>
            </div> */}

      <div className='all-shoes-container'>
        {shoesArray.map((shoe) => {
          return (
            <Box key={shoe.id}>
              <ShoeList shoe={shoe} key={shoe.id} />

              {/* <div>

                        <div className="shoe-image-container">

                            <a href={`/shoes/${shoe.id}`} >
                                <img className="shoe-image" src={shoe.image} alt={shoe.title}></img>
                            </a>
                        </div>
                        <div id="homepage-shoe-title"className="shoes-title">
                            <p className="homepage-shoe-title">
                                {shoe.title}
                            </p>

                        </div>
                        <div className="shoes-shoeSize">
                            <h4>{shoe.brand.toUpperCase()}</h4>
                        </div>
                        <div className="shoes-shoeSize">
                            <h4> Size: {shoe.shoeSize}</h4>
                        </div>
                        <div className="shoes-price">
                            <h3>${shoe.price}</h3>
                        </div>
                    </div> */}
            </Box>
          )
          // <ShoeList key={shoe.id} shoe={shoe} />
        })}
      </div>
      <div>
        {/* <footer>

<p>Christian Brown</p>

<div class="networking">
  <a href="https://www.linkedin.com/in/christian-brown-8770311ba/">
  <i class="fab fa-linkedin"></i>
</a>
<a href="mailto:Chrismbh4@gmail.com">
  <i class="fas fa-envelope-square"></i>
</a>

<a href="https://github.com/chrisbh4">
  <i class="fab fa-github"></i>
</a>
</div>

</footer> */}
      </div>
    </div>

  )
}

export default HomePage
