import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInterfaceType
} from 'graphql';

const PostInterface = new GraphQLInterfaceType({
  name: 'PostInterface',
  description: 'PostInterface',
  fields: () => ({
    title: {
      type: GraphQLString
    },
    done: {
      type: GraphQLBoolean
    }
  }),
  resolveType: (obj) => {
    return 'PostSchemas';
  }
});

export default PostInterface;
