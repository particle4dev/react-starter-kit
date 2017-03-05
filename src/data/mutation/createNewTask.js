import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean,
} from 'graphql';

import TodoType from '../types/TodoType';
import TodosModel from '../models/Todos';

const createNewTask = {
  type: TodoType,
  args: {
    title: { type: StringType },
  },
  resolve: async ({ request }, { title }) => {
    console.warn('handing error', title);
    return await TodosModel().create({
      title,
    });
  },
};

export default createNewTask;
