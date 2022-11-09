module.exports = {
  up: queryInterface => {
    const range = require('lodash/range');
    const arr = range(1, 5).map((_value, index) => ({
      student_id: index + 1,
      subject_id: index + 1
    }));
    return queryInterface.bulkInsert('students_subjects', arr, {});
  },
  down: queryInterface => queryInterface.bulkDelete('students_subjects', null, {})
};
