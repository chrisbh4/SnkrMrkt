'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Reviews', [
      { shoeId: 1, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 1, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 1, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 1, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 1, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 1, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 1, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 2, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 2, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 2, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 2, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 2, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 2, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 2, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 3, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 4, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 5, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 6, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 7, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 8, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 9, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 10, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 11, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 12, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 13, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 14, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 15, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 16, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 17, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 18, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 19, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 20, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 21, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 22, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 23, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 24, userId: 1, comment: 'Great pair and fix perfect', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      // {shoeId:25, userId:1, comment:'Great pair and fix perfect',rating:5, image:"imageGoesHere",createdAt:new Date(), updatedAt:new Date()},
      { shoeId: 3, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 4, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 5, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 6, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 7, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 8, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 9, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 10, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 11, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 12, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 13, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 14, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 15, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 16, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 17, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 18, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 19, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 20, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 21, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 22, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 23, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 24, userId: 2, comment: 'Nice product expensive but good it arrive very fast.', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      // {shoeId:25, userId:2, comment:'Nice product expensive but good it arrive very fast.',rating:4, image:"imageGoesHere",createdAt:new Date(), updatedAt:new Date()},
      { shoeId: 3, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 4, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 5, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 6, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 7, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 8, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 9, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 10, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 11, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 12, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 13, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 14, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 15, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 16, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 17, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 18, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 19, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 20, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 21, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 22, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 23, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 24, userId: 1, comment: 'This was a gift for my daughter and she is in love with these !!', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      // {shoeId:25, userId:1, comment:'This was a gift for my daughter and she is in love with these !!',rating:4, image:"imageGoesHere",createdAt:new Date(), updatedAt:new Date()},
      { shoeId: 3, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 4, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 5, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 6, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 7, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 8, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 9, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 10, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 11, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 12, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 13, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 14, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 15, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 16, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 17, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 18, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 19, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 20, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 21, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 22, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 23, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 24, userId: 2, comment: 'Just didn\'t feel right on my feet', rating: 2, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      // {shoeId:25, userId:2, comment:'Just didn\'t feel right on my feet',rating:2, image:"imageGoesHere",createdAt:new Date(), updatedAt:new Date()},
      { shoeId: 3, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 4, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 5, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 6, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 7, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 8, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 9, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 10, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 11, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 12, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 13, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 14, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 15, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 16, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 17, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 18, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 19, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 20, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 21, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 22, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 23, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 24, userId: 3, comment: 'Just what my son wants for christmas.', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      // {shoeId:25, userId:3, comment:'Just what my son wants for christmas.',rating:5, image:"imageGoesHere",createdAt:new Date(), updatedAt:new Date()},
      { shoeId: 3, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 4, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 5, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 6, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 7, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 8, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 9, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 10, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 11, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 12, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 13, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 14, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 15, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 16, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 17, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 18, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 19, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 20, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 21, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 22, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 23, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 24, userId: 2, comment: 'One of my most liked pair of shoes', rating: 4, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      // {shoeId:25, userId:2, comment:'One of my most liked pair of shoes',rating:4, image:"imageGoesHere",createdAt:new Date(), updatedAt:new Date()},
      { shoeId: 3, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 4, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 5, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 6, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 7, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 8, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 9, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 10, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 11, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 12, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 13, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 14, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 15, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 16, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 17, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 18, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 19, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 20, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 21, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 22, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 23, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() },
      { shoeId: 24, userId: 3, comment: 'This shoe can go with any fit!', rating: 5, image: 'imageGoesHere', createdAt: new Date(), updatedAt: new Date() }
      // {shoeId:25, userId:3, comment:'This shoe can go with any fit!',rating:5, image:"imageGoesHere",createdAt:new Date(), updatedAt:new Date()}
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Reviews', {})
  }
}
