import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean,
} from 'graphql';

import TodoType from '../types/TodoType';
import TodosModel from '../models/Todos';

const deleteTask = {
  type: TodoType,
  args: {
    id: { type: StringType },
  },
  resolve: async ({ request }, { id }) => {
    console.warn('handing error');
    await TodosModel().remove({ _id: id });
    return {
      id,
    };
  },
};

export default deleteTask;
