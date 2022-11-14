import get from 'lodash/get';
import { QueryRoot } from '../../../queries';
import { MutationRoot } from '../../../mutations';
import { GraphQLSchema, graphqlSync } from 'graphql';
import { createFieldsWithType, expectSameTypeNameOrKind } from '@server/utils/testUtils';
import { subjectFields } from '../../subjects';
import { timestamps } from '@gql/models/timestamps';

const schema = new GraphQLSchema({ query: QueryRoot, mutation: MutationRoot });

let fields = [];

fields = createFieldsWithType({ ...subjectFields, ...timestamps });

const query = `
  {
    __type(name: "Subject") {
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
describe('Subject introspection tests', () => {
  it('should have the correct fields and types', async () => {
    const result = await graphqlSync({ schema, source: query });
    const subjectFieldTypes = get(result, 'data.__type.fields');
    const hasCorrectFieldTypes = expectSameTypeNameOrKind(subjectFieldTypes, fields);
    expect(hasCorrectFieldTypes).toBeTruthy();
  });

  it('should have a students connection', () => {
    const result = graphqlSync({ schema, source: query });
    const subjectFieldTypes = get(result, 'data.__type.fields');
    const studentField = subjectFieldTypes.find(field => field.name === 'students');
    expect(studentField.type.kind).toBe('OBJECT');
    expect(studentField.type.name).toBe('StudentConnection');
  });
});
