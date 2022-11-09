import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { createConnection } from 'graphql-sequelize';
import { sequelizedWhere } from '@server/database/dbUtils';
import { totalConnectionFields } from '@server/utils';
import db from '@database/models';
import { getQueryFields, TYPE_ATTRIBUTES } from '@server/utils/gqlFieldUtils';
import { timestamps } from '../timestamps';

const { getNode } = require('@gql/node');
const { nodeInterface } = getNode();

export const studentsSubjectsFields = {
  id: { type: GraphQLNonNull(GraphQLID) },
  studentId: { type: GraphQLNonNull(GraphQLID) },
  subjectId: { type: GraphQLNonNull(GraphQLID) }
};

// StudentsSubjects type
export const StudentsSubjectsType = new GraphQLObjectType({
  name: 'StudentsSubjects',
  interfaces: [nodeInterface],
  fields: () => ({
    ...getQueryFields(studentsSubjectsFields, TYPE_ATTRIBUTES.isNonNull),
    ...timestamps
  })
});

export const StudentsSubjectsConnection = createConnection({
  nodeType: StudentsSubjectsType,
  name: 'StudentsSubjects',
  target: db.studentsSubjects,
  before: (findOptions, args, context) => {
    findOptions.include = findOptions.include || [];
    findOptions.where = sequelizedWhere(findOptions.where, args.where);
    return findOptions;
  },
  ...totalConnectionFields
});

// queries
export const StudentsSubjectsQueries = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: StudentsSubjectsType
  },
  list: {
    ...StudentsSubjectsConnection,
    type: StudentsSubjectsConnection.connectionType,
    args: StudentsSubjectsConnection.connectionArgs
  },
  model: db.studentsSubjects
};

export const subjectMutations = {
  args: studentsSubjectsFields,
  type: StudentsSubjectsType,
  model: db.studentsSubjects
};
