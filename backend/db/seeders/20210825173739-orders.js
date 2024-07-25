'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Orders', [
      { username: 'Demo-lition', buyerId: 1, email: 'bob@gamil.com', nameOnCard: 'dfasfaf', cardNumber: 'sdfadsfasdfasdf', expirationDate: '01/24', cvvNumber: 'sad', firstName: 'sadfasdf', lastName: 'fasf', company: 'ASDF', address: 'ASDF', otherAddress: 'ASDF', city: 'AF', country: 'United States', stateProvince: 'AL', postalCode: '78998', phoneNumber: '8234848', shoeIds: [6, 8, 11], totalAmount: '3567.3', orderNumber: '8921-482034-7295', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Demo-lition', buyerId: 1, email: 'bob@gmail.com', nameOnCard: 'christian', cardNumber: '7887 7887 4545 8888', expirationDate: '01/24', cvvNumber: '444', firstName: 'asfaf', lastName: 'asdfaf', company: '', address: 'dfasfsdf', otherAddress: '', city: 'adaaf', country: 'United States', stateProvince: 'CO', postalCode: '45474', phoneNumber: '094-345-9888', shoeIds: [5, 6, 19], totalAmount: '1638.2', orderNumber: '6710-384920-1043', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Demo-lition', buyerId: 1, email: 'chris@gmail.com', nameOnCard: 'Chrsitan Brown', cardNumber: '1111 1111 1111 1111', expirationDate: '04/28', cvvNumber: '222', firstName: 'Christian', lastName: 'Brown', company: '', address: '11111 hobday rd', otherAddress: '', city: 'elk grove ', country: 'United States', stateProvince: 'CA', postalCode: '95695', phoneNumber: '832-344-2444', shoeIds: [7, 14, 16], totalAmount: '3112.8', orderNumber: '2458-167389-5427', createdAt: new Date(), updatedAt: new Date() }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Orders', null, {})
  }
}
