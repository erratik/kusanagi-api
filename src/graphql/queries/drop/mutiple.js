import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import dropType from '../../types/drop';
import getProjection from '../../get-projection';
import DropModel from '../../../models/drop';

export default {
  type: new GraphQLList(dropType),
  args: {
    space: {
      name: 'space',
      type: GraphQLString,
    },
  },
  resolve(root, params, options, fieldASTs) {
    const projection = getProjection(fieldASTs);

    return DropModel.find()
      .select(projection)
      .exec();
  },
};
