import get from 'lodash/get';
import { graphqlSync, GraphQLSchema } from 'graphql';
import { createFieldsWithType, expectSameTypeNameOrKind } from '@utils/testUtils';
import { QueryRoot } from '../../../queries';
import { MutationRoot } from '../../../mutations';
import { timestamps } from '@gql/models/timestamps';
import { studentsFields } from '@gql/models/students';

const schema = new GraphQLSchema({ query: QueryRoot, mutation: MutationRoot });

let fields = [];

fields = createFieldsWithType({ ...studentsFields, ...timestamps });

const query = `
  {
    __type(name: "Student") {
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
describe('Students introspection tests', () => {
  it('should have the correct fields and types', () => {
    const result = graphqlSync({ schema, source: query });

    const studentFieldTypes = get(result, 'data.__type.fields');

    const hasCorrectFieldTypes = expectSameTypeNameOrKind(studentFieldTypes, fields);

    expect(hasCorrectFieldTypes).toBeTruthy();
  });

  it('should have a subjects connection', () => {
    const result = graphqlSync({ schema, source: query });
    const studentFieldTypes = get(result, 'data.__type.fields');
    const subjectField = studentFieldTypes.find(field => field.name === 'subjects');
    expect(subjectField.type.kind).toBe('OBJECT');
    expect(subjectField.type.name).toBe('SubjectConnection');
  });
});
