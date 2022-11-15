import { GraphQLInt, GraphQLNonNull } from 'graphql';

export const limitOffset = {
  limit: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Number of records targeted to show at a time'
  },
  offset: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Number of records to skip before selecting records'
  },
  before: { type: GraphQLInt, description: 'Use with grapql-relay compliant queries' },
  after: { type: GraphQLInt, description: 'Use with grapql-relay compliant queries' },
  first: { type: GraphQLInt, description: 'Use with grapql-relay compliant queries' },
  last: { type: GraphQLInt, description: 'Use with grapql-relay compliant queries' }
};
