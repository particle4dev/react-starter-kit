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

const ProfileSchemas = new GraphQLObjectType({
  name: 'ProfileSchemas',
  description: 'ProfileSchemas',
  fields: () => ({
    picture: {
      type: GraphQLString,
    }
  })
});

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
    profile:{
      type: ProfileSchemas,
    },
    todos: {
      type: new GraphQLList(TodoSchemas),
      resolve: (user) => TodosModel().find({owner: user._id}),
    },
    friends: {
      type: new GraphQLList(UserSchemas),
      resolve: async (user) => {
        let friendListByIds = await FriendsModel().find({user: user._id}).select('friend _id');
        friendListByIds = friendListByIds.map((v) => v.friend);
        return UsersModel().find({
          _id: {$in: friendListByIds}
        });
      },
    },
    friendSuggestions: {
      type: new GraphQLList(UserSchemas),
      resolve: async (user) => {
        let friendListByIds = await FriendsModel().find({user: user._id}).select('friend _id');
        friendListByIds = friendListByIds.map((v) => v.friend);
        friendListByIds.push(user._id);
        return UsersModel().find({
          _id: {$nin: friendListByIds}
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
