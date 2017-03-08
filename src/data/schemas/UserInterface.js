import {
  GraphQLString,
  GraphQLInterfaceType
} from 'graphql';

import ProfileSchemas from './ProfileSchemas';

const UserInterface = new GraphQLInterfaceType({
  name: 'UserInterface',
  description: 'UserInterface',
  fields: () => ({
    username: {
      type: GraphQLString
    },
    profile:{
      type: ProfileSchemas,
    },
  }),
  resolveType: (obj) => {
    return 'UserSchemas';
  }
});

export default UserInterface;
