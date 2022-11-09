module.exports = {
  up: queryInterface => {
    const faker = require('faker');
    const range = require('lodash/range');
    const arr = range(1, 20).map((_value, index) => ({
      name: faker.name.firstName(),
      city: faker.address.cityName(),
      age: 15 + index
    }));
    return queryInterface.bulkInsert('students', arr, {});
  },
  down: queryInterface => queryInterface.bulkDelete('students', null, {})
};
