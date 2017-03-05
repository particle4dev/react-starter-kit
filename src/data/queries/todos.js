import {
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLList,
} from 'graphql';
import TodoSchemas from '../schemas/TodoSchemas';
import {
  TodosModel,
} from '../models';

console.warn('implement paging todos');

const todos = {
  type: new GraphQLList(TodoSchemas),
  args: {
    limit: { type: IntType },
  },
  resolve({ request }, {limit}) {
    return TodosModel().find({}).limit(limit);
  },
};

export default todos;
