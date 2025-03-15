const fetch = require('node-fetch')
const express = require('express')
const asyncHandler = require('express-async-handler')

const router = express.Router()

/*
TODO:
- [x] StockX API
    - [ ] OAuth connected with credentials
    - [ ] Single Shoe search works and fetched API data includes images

 */

router.get('/', asyncHandler(async (req, res) => {
    // const response = await fetch(`https://accounts.stockx.com/authorize?response_type=code&client_id=${process.env.STOCKX_APPLICATION_ID}&redirect_uri=${process.env.STOCKX_REDIRECT_URI}&scope=offline_access%20openid&audience=gateway.stockx.com&state=${process.env.STOCKX_STATE_VALUE}`)
    // console.log(response)
    // res.json({ api: response })
    const url = `https://accounts.stockx.com/authorize?response_type=code&client_id=${process.env.STOCKX_APPLICATION_ID}&redirect_uri=${process.env.STOCKX_REDIRECT_URI}&scope=offline_access%20openid&audience=gateway.stockx.com&state=${process.env.STOCKX_STATE_VALUE}`
    console.log(process.env.STOCKX_REDIRECT_URI)
    res.redirect(url)
}
))

// router.get('/callback', asyncHandler(async (req, res) => {
//     const response = await fetch(`https://accounts.stockx.com/oauth/token?grant_type=authorization_code&client_id=${process.env.STOCKX_APPLICATION_ID}&client_secret=${process.env.STOCKX_SECRET}&code=${req.query.code}&redirect_uri=${process.env.STOCKX_REDIRECT_URI}`)
//     console.log(response)
//     console.log(req)
//     res.json({ api: response })
// }
// ))


router.get('/callback', asyncHandler(async (req, res) => {
    console.log('Callback route hit!');
    console.log('Query params:', req.query);
    
    if (!req.query.code) {
        return res.status(400).json({ error: 'Authorization code missing' });
    }

    res.json({ message: 'OAuth callback received!', code: req.query.code });
}));

// Handle OAuth callback and exchange code for access token
// router.get('/callback', asyncHandler(async (req, res) => {
//     console.log(res.query.code)
//     if (!req.query.code) {
//         return res.status(400).json({ error: 'Missing authorization code' });
//     }

//     const tokenUrl = 'https://accounts.stockx.com/oauth/token';
//     const bodyParams = new URLSearchParams({
//         grant_type: 'authorization_code',
//         client_id: process.env.STOCKX_APPLICATION_ID,
//         client_secret: process.env.STOCKX_SECRET,
//         code: req.query.code,
//         redirect_uri: process.env.STOCKX_REDIRECT_URI,
//     });

//     const response = await fetch(tokenUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: bodyParams.toString(),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         return res.status(response.status).json({ error: data });
//     }

//     res.json({ token: data });
// }));









module.exports = router