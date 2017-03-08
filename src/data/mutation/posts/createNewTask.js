import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean,
} from 'graphql';

import PostSchemas from '../../schemas/PostSchemas';
import { PostsModel } from '../../models';

const createNewTask = {
  type: PostSchemas,
  args: {
    title: { type: StringType },
  },
  resolve: async ({ request }, { title }) => {
    console.warn('handing error');
    return await PostsModel().create({
      title,
      owner: request.user.id,
    });
  },
};

export default createNewTask;
