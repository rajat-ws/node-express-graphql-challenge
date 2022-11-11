import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import { studentsSubjectsTable } from '@server/utils/testUtils/mockData';

describe('students_subjects graphql-server-DB query tests', () => {
  const id = 1;
  const studentSubjectOne = `
    query {
        studentsSubject (id: ${id}) {
          id
          studentId
          subjectId
        }
      }
    `;

  it('should request for students and subjects related to the studentSubjects', async () => {
    const dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);

    jest.spyOn(dbClient.models.studentsSubjects, 'findAll').mockImplementation(() => [studentsSubjectsTable[0]]);
    const res = await getResponse(studentSubjectOne);
    const result = get(res, 'body.data.studentsSubject');
    expect(result).toBeTruthy();

    expect(result).toEqual(
      expect.objectContaining({
        id: studentsSubjectsTable[0].id,
        studentId: studentsSubjectsTable[0].studentId.toString(),
        subjectId: studentsSubjectsTable[0].subjectId.toString()
      })
    );
  });
});
