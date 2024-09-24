'use strict'
const faker = require('faker')
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Demo-lition',
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'User',
        shoeSize: '10',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'FakeUser1',
        email: faker.internet.email(),
        firstName: 'Fake',
        lastName: 'User',
        shoeSize: '9',
        hashedPassword: bcrypt.hashSync(faker.internet.password())
      },
      {
        username: 'FakeUser2',
        email: faker.internet.email(),
        firstName: 'Fake',
        lastName: 'User',
        shoeSize: '11.5',
        hashedPassword: bcrypt.hashSync(faker.internet.password())
      },
      {
        username: 'chris',
        email: 'chris@chris.io',
        firstName: 'Chris',
        lastName: 'Brown',
        shoeSize: '13',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'chris'] }
    }, {})
  }
}
