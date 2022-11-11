import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import { studentsTable, subjectsTable } from '@server/utils/testUtils/mockData';

describe('Subject graphql-server-DB query tests', () => {
  const subjectId = 1;
  const subjectOne = `
        query {
            subject (id: ${subjectId}) {
                id
                name
                students {
                    edges {
                        node {
                            id 
                            name
                        }
                    }
                }
            }
        }
    `;

  it('should return all the fields of subject to check if all the returning values match the correct values associated with subjectId', async () => {
    const dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);

    jest.spyOn(dbClient.models.students, 'findAll').mockImplementation(() => [studentsTable[0]]);
    await getResponse(subjectOne).then(res => {
      const result = get(res, 'body.data.subject');
      expect(result).toBeTruthy();

      expect(result).toEqual(
        expect.objectContaining({
          id: subjectsTable[0].id,
          name: subjectsTable[0].name
        })
      );

      const resultTwo = get(res, 'body.data.subject.students.edges[0].node');
      expect(resultTwo).toEqual(
        expect.objectContaining({
          id: studentsTable[0].id,
          name: studentsTable[0].name
        })
      );

      expect(dbClient.models.students.findAll.mock.calls.length).toBe(1);
      expect(dbClient.models.students.findAll.mock.calls[0][0].include[0].where).toEqual({ subjectId });
      expect(dbClient.models.students.findAll.mock.calls[0][0].include[0].model.name).toEqual('studentSubjects');
    });
  });
});
