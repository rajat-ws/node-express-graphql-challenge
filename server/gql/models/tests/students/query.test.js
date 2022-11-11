import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import { studentsTable, subjectsTable } from '@server/utils/testUtils/mockData';

describe('Student graphql-server-DB query tests', () => {
  const studentId = 1;
  const studentOne = `
    query {
        student (id: ${studentId}) {
          id
          name
          city
          age
          subjects {
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

  it('should return all the fields of student to check if all the returning values match the correct values assosciated with studentId', async () => {
    const dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);

    jest.spyOn(dbClient.models.subjects, 'findAll').mockImplementation(() => [subjectsTable[0]]);
    await getResponse(studentOne).then(response => {
      const result = get(response, 'body.data.student');
      expect(result).toBeTruthy();

      expect(result).toEqual(
        expect.objectContaining({
          id: studentsTable[0].id,
          name: studentsTable[0].name,
          city: studentsTable[0].city,
          age: studentsTable[0].age
        })
      );

      const res = get(response, 'body.data.student.subjects.edges[0].node');
      expect(res).toEqual(
        expect.objectContaining({
          id: subjectsTable[0].id,
          name: subjectsTable[0].name
        })
      );
      expect(dbClient.models.subjects.findAll.mock.calls.length).toBe(1);
      expect(dbClient.models.subjects.findAll.mock.calls[0][0].include[0].where).toEqual({ studentId });
      expect(dbClient.models.subjects.findAll.mock.calls[0][0].include[0].model.name).toEqual('studentSubjects');
    });
  });
});
