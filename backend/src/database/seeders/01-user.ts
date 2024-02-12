import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface : QueryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Samuel',
        lastName: 'Morais',
        phone: '38988449448',
        email: 'moraissamuel009@gmail.com',
        password: 'S@muel123'
      },
      {
        name: 'Pedro',
        lastName: 'Garcia',
        phone: '38988039177',
        email: 'pedrogarcia@gmail.com',
        password: 'pedro123'
      }
    ])
  },
  down : async (queryInterface : QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  }
}