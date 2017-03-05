import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean,
} from 'graphql';

import UserInterface from './UserInterface';
import TodoInterface from './TodoInterface';

import {
  UsersModel,
} from '../models';

const TodoSchemas = new ObjectType({
  name: 'TodoSchemas',
 interfaces: [TodoInterface],
  fields: {
    _id: { type: new NonNull(ID) },
    title: { type: StringType },
    done: { type: Boolean },
    owner: {
      type: UserInterface,
      resolve: (todo) => UsersModel().findOne({_id: todo.owner}),
    }
  },
});

export default TodoSchemas;
