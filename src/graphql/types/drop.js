import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import DropModel from '../../models/drop';
import SingleDropType from './drop-single';
import type Context from '../data-loaders/data-loaders';

export default new GraphQLObjectType({
  name: 'Drop',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    space: {
      type: GraphQLString,
    },
    drops: {
      type: new GraphQLList(SingleDropType),
    },
    dropCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(parent, args, ctx: Context) {
        console.log(`counting drops for ${parent.space}`);
        // Drops =
        console.log(ctx.countByTypes.load(DropModel, parent.space));
        return 8;
      },
    },
  },
});
