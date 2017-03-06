import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import UserInterface from './UserInterface';
import TodoSchemas from './TodoSchemas';
import {
  TodosModel,
  UsersModel,
  FriendsModel,
} from '../models';

const UserSchemas = new GraphQLObjectType({
  name: 'UserSchemas',
  interfaces: [UserInterface],
  description: 'UserInterface',
  fields: () => ({
    _id: {
      type: GraphQLString,
      // resolve: (user) => user._id,
    },
    username: {
      type: GraphQLString,
      // resolve: (user) => user._id,
    },
    todos: {
      type: new GraphQLList(TodoSchemas),
      resolve: (user) => TodosModel().find({owner: user._id}),
    },
    friends: {
      type: new GraphQLList(UserInterface),
      resolve: async (user) => {
        let friendListByIds = await FriendsModel().find({user: user._id}).select('friend _id');
        friendListByIds = friendListByIds.map((v) => v.friend);
        return UsersModel().find({
          _id: {$in: friendListByIds}
        });
      },
    },
    totalFriends: {
      type: GraphQLInt,
      resolve: async (user) => {
        return FriendsModel().count({user: user._id}).select('_id');
      },
    }
  })
});

export default UserSchemas;
