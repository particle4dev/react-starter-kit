import {
  GraphQLString,
  GraphQLInterfaceType
} from 'graphql';

const UserInterface = new GraphQLInterfaceType({
  name: 'UserInterface',
  description: 'UserInterface',
  fields: () => ({
    username: {
      type: GraphQLString
    }
  }),
  resolveType: (obj) => {
    return 'UserSchemas';
  }
});

export default UserInterface;
