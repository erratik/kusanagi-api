import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import SingleDropType from './drop-single';

export default new GraphQLInputObjectType({
  name: 'DropInput',
  fields: {
    _id: { type: GraphQLID },
    space: { type: GraphQLString },
    drops: {
      type: new GraphQLList(SingleDropType),
    },
  },
});
