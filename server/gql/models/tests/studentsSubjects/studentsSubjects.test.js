import get from 'lodash/get';
import { graphqlSync, GraphQLSchema } from 'graphql';
import { createFieldsWithType, expectSameTypeNameOrKind } from '@utils/testUtils';
import { QueryRoot } from '../../../queries';
import { MutationRoot } from '../../../mutations';
import { timestamps } from '@gql/models/timestamps';
import { studentsSubjectsFields } from '@gql/models/studentsSubjects';

const schema = new GraphQLSchema({ query: QueryRoot, mutation: MutationRoot });

let fields = [];

fields = createFieldsWithType({ ...studentsSubjectsFields, ...timestamps });

const query = `
{
    __type(name: "StudentsSubjects") {
        name
        kind
        fields {
          name
          type {
            name
            kind
          }
        }
      }    
  }
`;

describe('Students Subjects introspection tests', () => {
  it('should have the correct fields and types', async () => {
    const result = await graphqlSync({ schema, source: query });
    const studentsSubjectsFieldTypes = get(result, 'data.__type.fields');
    const hasCorrectFieldTypes = expectSameTypeNameOrKind(studentsSubjectsFieldTypes, fields);
    expect(hasCorrectFieldTypes).toBeTruthy();
  });
});
