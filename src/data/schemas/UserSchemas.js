import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import UserInterface from './UserInterface';
import TodoSchemas from './TodoSchemas';
import {
  TodosModel,
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
    }
  })
});

export default UserSchemas;
