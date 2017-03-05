import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as Boolean,
} from 'graphql';

import TodoSchemas from '../schemas/TodoSchemas';
import TodosModel from '../models/Todos';

const createNewTask = {
  type: TodoSchemas,
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
