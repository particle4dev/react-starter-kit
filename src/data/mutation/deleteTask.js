import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean,
} from 'graphql';

import TodoSchemas from '../schemas/TodoSchemas';
import TodosModel from '../models/Todos';

const deleteTask = {
  type: TodoSchemas,
  args: {
    _id: { type: StringType },
  },
  resolve: async ({ request }, { _id }) => {
    console.warn('handing error');
    await TodosModel().remove({ _id });
    return {
      _id,
    };
  },
};

export default deleteTask;
