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
  resolve({ request }) {
    return TodosModel().find({});
  },
};

export default todos;
