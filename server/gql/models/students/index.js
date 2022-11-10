import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { createConnection } from 'graphql-sequelize';
import { sequelizedWhere } from '@server/database/dbUtils';
import { totalConnectionFields } from '@server/utils';
import db from '@database/models';
import { getQueryFields, TYPE_ATTRIBUTES } from '@server/utils/gqlFieldUtils';
import { timestamps } from '../timestamps';
import { SubjectConnection } from '../subjects';

const { getNode } = require('@gql/node');
const { nodeInterface } = getNode();

export const studentsFields = {
  id: { type: GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLNonNull(GraphQLString) },
  city: { type: GraphQLNonNull(GraphQLString) },
  age: { type: GraphQLNonNull(GraphQLInt) }
};

// Student type
export const StudentType = new GraphQLObjectType({
  name: 'Student',
  interfaces: [nodeInterface],
  fields: () => ({
    ...getQueryFields(studentsFields, TYPE_ATTRIBUTES.isNonNull),
    ...timestamps,
    subjects: {
      type: SubjectConnection.connectionType,
      args: SubjectConnection.connectionArgs,
      resolve: (source, args, context, info) =>
        SubjectConnection.resolve(source, args, { ...context, student: source.dataValues }, info)
    }
  })
});

export const StudentConnection = createConnection({
  nodeType: StudentType,
  name: 'Student',
  target: db.students,
  before: (findOptions, args, context) => {
    findOptions.include = findOptions.include || [];
    findOptions.where = sequelizedWhere(findOptions.where, args.where);

    if (context?.subject?.id) {
      findOptions.include({
        model: db.studentsSubjects,
        where: {
          subjectId: context.subject.id
        }
      });
    }
    return findOptions;
  },
  ...totalConnectionFields
});

// queries
export const studentQueries = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: StudentType
  },
  list: {
    ...StudentConnection,
    type: StudentConnection.connectionType,
    args: StudentConnection.connectionArgs
  },
  model: db.students
};

export const studentMutations = {
  args: studentsFields,
  type: StudentType,
  model: db.students
};
