import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean,
} from 'graphql';

import UserSchemas from '../../schemas/UserSchemas';
import { UsersModel, FriendsModel } from '../../models';

const removeFriend = {
  type: UserSchemas,
  args: {
    _id: { type: StringType },
  },
  resolve: async ({ request }, { _id }) => {
    console.warn('handing error');
    console.log(_id, request.user.id);
    const r = await FriendsModel().remove({
      user: request.user.id,
      friend: _id
    });
    return UsersModel().findOne({
      _id
    });
  },
};

export default removeFriend;
