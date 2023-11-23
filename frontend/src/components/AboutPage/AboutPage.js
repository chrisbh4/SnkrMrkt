import React, { useEffect } from 'react'
import './AboutPage.css'
import { useDispatch } from 'react-redux'
import { Text, Box, Center, Image } from '@chakra-ui/react'

function AboutPage () {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getLoadCart())
  }, [dispatch])

  return (
    <div className='splash-page-img'>
      <div className='about-formatter'>
        <div className='about-info-placement'>
          {/* <p className="about-info">
                This application is a clone based off the E-Commerce designer clothing/shoes store 'GOAT'.
                This site allows logged in users to buy or sell high-end designer shoes and also high end
                athletic shoes. All shoes sizes are dispalyed in mens until future features are added to where kids,woman, and men shoe sizes are available.
                Future features that plan to be added are Images for shoes and comments , personal user profile, shopping cart , user purchases, search bar , category filters
            </p> */}

          <Center>
            <Image src='https://imgur.com/KOgkPYD.png' boxSize='xl' />
            <Text w='40%' fontSize='2xl' px='1em'>
              Welcome to Snkr Mrkt, your premier destination for exclusive sneakers!
              {/* As passionate sneaker enthusiasts,
                            we're dedicated to offering a secure platform for buying and selling top-tier sneakers at competitive prices,
                            all with a focus on customer satisfaction. Thank you for making us your go-to source for the latest sneaker drops! */}
            </Text>
            {/* <Text w={"50%"} fontSize={'2xl'} px={'1em'} >
                        Welcome to Snkr Mrkt! Your go-to hub for exclusive sneakers, offering secure transactions and unbeatable prices. Thanks for choosing us for the latest drops!
                        </Text> */}

          </Center>

          <Box pt='3%'>

            <div className='networking'>
              <p className='splash-name'>Christian Brown</p>
              <a href='https://www.linkedin.com/in/christian-brown-8770311ba/'>
                <i class='splash-icon fab fa-linkedin' />
              </a>
              <a href='mailto:Chrismbh4@gmail.com'>
                <i class='splash-icon fas fa-envelope-square' />
              </a>

              <a href='https://github.com/chrisbh4'>
                <i class='splash-icon fab fa-github' />
              </a>
            </div>
          </Box>
        </div>

      </div>
    </div>
  )
}

export default AboutPage
