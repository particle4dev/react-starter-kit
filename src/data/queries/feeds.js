import {
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLList,
} from 'graphql';
import PostSchemas from '../schemas/PostSchemas';
import {
  PostsModel,
  FriendsModel,
} from '../models';

console.warn('implement paging feeds');

const feeds = {
  type: new GraphQLList(PostSchemas),
  args: {
    limit: { type: IntType },
  },
  resolve: async ({ request }, {limit}) => {
    const userId = request.user.id;
    let friendListByIds = await FriendsModel().find({user: userId}).select('friend _id');
    friendListByIds = friendListByIds.map((v) => v.friend);
    friendListByIds.push(userId);
    return PostsModel().find({owner: friendListByIds}).limit(limit).sort({createdAt: -1});
  },
};

export default feeds;
