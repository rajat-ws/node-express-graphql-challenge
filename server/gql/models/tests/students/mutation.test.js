import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import { studentsTable } from '@utils/testUtils/mockData';

describe('Student graphQL-server-DB mutation tests', () => {
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });

  // create
  const createStudentMutation = `
    mutation {
      createStudent (
        name: "${studentsTable[0].name}",
        city: "${studentsTable[0].city}",
        age: ${studentsTable[0].age},
      ) {
        id
        name
        city
        age
        createdAt
        updatedAt
        deletedAt
        subjects {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;

  it('should have mutation to create a new student', async () => {
    const response = await getResponse(createStudentMutation);
    const result = get(response, 'body.data.createStudent');

    expect(result).toMatchObject({
      id: studentsTable[0].id,
      name: studentsTable[0].name,
      city: studentsTable[0].city,
      age: studentsTable[0].age
    });
  });

  // update
  const updateStudentMutation = `
    mutation {
      updateStudent (
        id: ${studentsTable[0].id},
        name: "${studentsTable[0].name}",
        city: "${studentsTable[0].city}",
        age: ${studentsTable[0].age},
      ) {
        id
      }
    }
  `;

  it('should have a mutation to update a student', async () => {
    const response = await getResponse(updateStudentMutation);
    const result = get(response, 'body.data.updateStudent');
    expect(result).toMatchObject({
      id: '1'
    });
  });

  // delete
  const deleteStudentMutation = `
   mutation {
     deleteStudent (
       id: ${studentsTable[0].id},
     ) {
       id
     }
   }
 `;

  it('should have a mutation to delete a student', async () => {
    const response = await getResponse(deleteStudentMutation);
    const result = get(response, 'body.data.deleteStudent');
    expect(result).toEqual(
      expect.objectContaining({
        id: 1
      })
    );
  });
});
