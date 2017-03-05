import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInterfaceType
} from 'graphql';

const TodoInterface = new GraphQLInterfaceType({
  name: 'TodoInterface',
  description: 'TodoInterface',
  fields: () => ({
    title: {
      type: GraphQLString
    },
    done: {
      type: GraphQLBoolean
    }
  }),
  resolveType: (obj) => {
    return 'TodoSchemas';
  }
});

export default TodoInterface;
