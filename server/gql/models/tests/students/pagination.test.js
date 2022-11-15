import get from 'lodash/get';
import { getResponse, resetAndMockDB } from '@server/utils/testUtils';
import { studentsTable } from '@server/utils/testUtils/mockData';

describe('Student graphQL-serverDB pagination tests', () => {
  const studentsQuery = `
        query {
            students (first: 1, limit: 1, offset: 0) {
                edges {
                    node {
                        id
                        name
                        city 
                        age
                    }
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
                total
            }
        }
    `;

  it('should have a query to get the students', async () => {
    resetAndMockDB(null, {});
    const response = await getResponse(studentsQuery);
    const result = get(response, 'body.data.students.edges[0].node');
    expect(result).toEqual(
      expect.objectContaining({
        id: studentsTable[0].id,
        name: studentsTable[0].name,
        city: studentsTable[0].city,
        age: studentsTable[0].age
      })
    );
  });

  it('should have the correct page info', async () => {
    const response = await getResponse(studentsQuery);
    const result = get(response, 'body.data.students.pageInfo');

    expect(result).toEqual(
      expect.objectContaining({
        hasNextPage: true,
        hasPreviousPage: false
      })
    );
  });
});
