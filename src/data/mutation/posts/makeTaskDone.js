import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean,
} from 'graphql';

import PostSchemas from '../../schemas/PostSchemas';
import { PostsModel } from '../../models';

const makeTaskDone = {
  type: PostSchemas,
  args: {
    _id: { type: StringType },
  },
  resolve: async ({ request }, { _id }) => {
    console.warn('handing error');
    const r = await PostsModel().update({ _id }, { $set: { done: true } });
    return await PostsModel().findOne({ _id });
  },
};

export default makeTaskDone;
