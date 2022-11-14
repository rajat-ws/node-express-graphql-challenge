import get from 'lodash/get';
import { getResponse, mockDBClient, resetAndMockDB } from '@utils/testUtils';
import { studentsSubjectsTable } from '@server/utils/testUtils/mockData';

describe('student_subjects graphQL-server-DB mutation tests', () => {
  let dbClient;
  beforeEach(() => {
    dbClient = mockDBClient();
    resetAndMockDB(null, {}, dbClient);
  });

  // create
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

  // delete
  const deleteStudentsSubjectMutation = `
    mutation {
        deleteStudentsSubject (
            id: 1
        ) {
            id
        }
    }
  `;

  it('should have a mutation to delete a student subject', async () => {
    const res = await getResponse(deleteStudentsSubjectMutation);
    const result = get(res, 'body.data.deleteStudentsSubject');
    expect(result).toEqual(
      expect.objectContaining({
        id: 1
      })
    );
  });

  // update
  const updateStudentsSubjectMutation = `
    mutation {
        updateStudentsSubject (
            id: ${studentsSubjectsTable[0].id}
            studentId: ${studentsSubjectsTable[0].studentId}
            subjectId: ${studentsSubjectsTable[0].subjectId}
          ) {
            id
          }
    }
  `;

  it('should have a mutation to update a new student subject', async () => {
    jest.spyOn(dbClient.models.studentsSubjects, 'update');
    const response = await getResponse(updateStudentsSubjectMutation);
    const result = get(response, 'body.data.updateStudentsSubject');
    expect(result).toBeTruthy();
    expect(dbClient.models.studentsSubjects.update.mock.calls[0][0]).toEqual({
      id: studentsSubjectsTable[0].id.toString(),
      studentId: studentsSubjectsTable[0].studentId.toString(),
      subjectId: studentsSubjectsTable[0].subjectId.toString()
    });
  });
});
