import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import { subjectsTable } from '@utils/testUtils/mockData';

describe('Subject graphQL-server-DB mutation tests', () => {
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });

  const createSubjectMutation = `
    mutation {
        createSubject (
            name: "${subjectsTable[0].name}"
        ) {
            id
            name
            createdAt
            updatedAt
            deletedAt
            students {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    }
  `;
  it('should have mutation to create a new subject', async () => {
    const response = await getResponse(createSubjectMutation);
    const result = get(response, 'body.data.createSubject');

    expect(result).toMatchObject({
      id: subjectsTable[0].id,
      name: subjectsTable[0].name
    });
  });
});
