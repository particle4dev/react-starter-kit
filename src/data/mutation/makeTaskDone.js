import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean,
} from 'graphql';

import TodoSchemas from '../schemas/TodoSchemas';
import TodosModel from '../models/Todos';

const makeTaskDone = {
  type: TodoSchemas,
  args: {
    _id: { type: StringType },
  },
  resolve: async ({ request }, { _id }) => {
    console.warn('handing error');
    const r = await TodosModel().update({ _id }, { $set: { done: true } });
    return await TodosModel().findOne({ _id });
  },
};

export default makeTaskDone;
