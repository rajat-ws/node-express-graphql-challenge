module.exports = {
  up: queryInterface => {
    const faker = require('faker');
    const range = require('lodash/range');
    const arr = range(1, 20).map((value, index) => ({
      name: faker.commerce.productName()
    }));
    return queryInterface.bulkInsert('subjects', arr, {});
  },
  down: queryInterface => queryInterface.bulkDelete('subjects', null, {})
};
