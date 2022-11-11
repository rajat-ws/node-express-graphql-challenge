import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import { studentsTable } from '@utils/testUtils/mockData';

describe('Student graphQL-server-DB mutation tests', () => {
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });

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
});
