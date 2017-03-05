/*eslint-disable */
import {
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLList,
} from 'graphql';
import TodoType from '../types/TodoType';
import {
  TodosModel,
} from '../models';

const todos = {
  type: new GraphQLList(TodoType),
  args: {
    // cursor: { type: StringType },
    limit: { type: IntType },
  },
  resolve: async (obj, { limit }) => {
    return await TodosModel().find().limit(limit).sort({createdAt: -1}); // eslint-disable-line max-len no-return-await
  }
};

export default todos;
/*eslint-enable */
