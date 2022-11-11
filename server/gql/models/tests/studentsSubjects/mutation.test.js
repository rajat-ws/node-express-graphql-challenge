import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';

describe('student_subjects graphQL-server-DB mutation tests', () => {
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });

  const createStudentSubjectMutation = `
    mutation {
        createStudentsSubject (
        studentId: 1
        subjectId: 1
      ) {
        id
        studentId
        subjectId
        createdAt
        updatedAt
        deletedAt
      }
    }
  `;
  it('should have a mutation to create a new studentSubject', async () => {
    const res = await getResponse(createStudentSubjectMutation);
    const result = get(res, 'body.data.createStudentsSubject');
    expect(result).toMatchObject({
      id: '1',
      studentId: '1',
      subjectId: '1'
    });
  });
});
