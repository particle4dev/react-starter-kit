import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean,
} from 'graphql';

import PostSchemas from '../../schemas/PostSchemas';
import { PostsModel } from '../../models';

const deleteTask = {
  type: PostSchemas,
  args: {
    _id: { type: StringType },
  },
  resolve: async ({ request }, { _id }) => {
    console.warn('handing error');
    await PostsModel().remove({ _id });
    return {
      _id,
    };
  },
};

export default deleteTask;
