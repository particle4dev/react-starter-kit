/*eslint-disable */
import {
  GraphQLInt as IntType,
  GraphQLList,
} from 'graphql';
import TodoType from '../types/TodoType';
import {
  TodosModel,
} from '../models';

const todos = {
  type: new GraphQLList(TodoType),
  args: {
    limit: { type: IntType },
  },
  resolve: async (obj, { limit }) => await TodosModel().find().limit(limit), // eslint-disable-line max-len no-return-await
};

export default todos;
/*eslint-enable */
