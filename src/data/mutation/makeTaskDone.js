import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean,
} from 'graphql';

import TodoType from '../types/TodoType';
import TodosModel from '../models/Todos';

const makeTaskDone = {
  type: TodoType,
  args: {
    id: { type: StringType },
  },
  resolve: async ({ request }, { id }) => {
    const r = await TodosModel().update({ _id: id }, { $set: { done: true } });
    console.warn('handing error');

    return await TodosModel().findOne({ _id: id });
  },
};

export default makeTaskDone;
