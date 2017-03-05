import {
  GraphQLString as StringType,
  GraphQLList,
} from 'graphql';
import TodoSchemas from '../schemas/TodoSchemas';
import {
  TodosModel,
} from '../models';

const todo = {
  type: TodoSchemas,
  args: {
    _id: { type: StringType },
  },
  resolve({ request }, {_id}) {
    return TodosModel().findOne({_id});
  },
};

export default todo;
