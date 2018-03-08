import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
// import { Types } from 'mongoose';

import dropType from '../../types/drop';
import getProjection from '../../get-projection';
import DropModel from '../../../models/drop';

export default {
  type: dropType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    space: {
      name: 'space',
      type: GraphQLString,
    },
  },
  resolve(root, params, options, fieldsASTs) {
    const projection = getProjection(fieldsASTs);

    return DropModel.findById(params.id)
      .select(projection)

      .exec();
  },
};
