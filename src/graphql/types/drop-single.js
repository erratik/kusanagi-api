import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

export default new GraphQLObjectType({
  name: 'SingleDrop',
  description: 'SingleDrop',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    type: {
      type: GraphQLString,
    },
    timestamp: {
      type: GraphQLFloat,
    },
    content: {
      type: GraphQLJSON,
    },
  },
});
