import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { createConnection } from 'graphql-sequelize';
import { sequelizedWhere } from '@server/database/dbUtils';
import { totalConnectionFields } from '@server/utils';
import db from '@database/models';
import { getQueryFields, TYPE_ATTRIBUTES } from '@server/utils/gqlFieldUtils';
import { timestamps } from '../timestamps';
import { studentQueries } from '../students';

const { getNode } = require('@gql/node');
const { nodeInterface } = getNode();

export const subjectsFields = {
  id: { type: GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLNonNull(GraphQLString) }
};

// Subject type
export const SubjectType = new GraphQLObjectType({
  name: 'Subject',
  interfaces: [nodeInterface],
  fields: () => ({
    ...getQueryFields(subjectsFields, TYPE_ATTRIBUTES.isNonNull),
    ...timestamps,
    students: {
      ...studentQueries.list,
      resolve: (source, args, context, info) =>
        studentQueries.list.resolve(source, args, { ...context, subject: source.dataValues }, info)
    }
  })
});

export const SubjectConnection = createConnection({
  nodeType: SubjectType,
  name: 'Subject',
  target: db.subjects,
  before: (findOptions, args, context) => {
    findOptions.include = findOptions.include || [];
    findOptions.where = sequelizedWhere(findOptions.where, args.where);

    if (context?.student?.id) {
      findOptions.include.push({
        model: db.studentsSubjects,
        where: {
          studentId: context.student.id
        }
      });
    }

    return findOptions;
  },
  ...totalConnectionFields
});

// queries
export const subjectQueries = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  query: {
    type: SubjectType
  },
  list: {
    ...SubjectConnection,
    type: SubjectConnection.connectionType,
    args: SubjectConnection.connectionArgs
  },
  model: db.subjects
};

export const subjectMutations = {
  args: subjectsFields,
  type: SubjectType,
  model: db.subjects
};
