import {
  GraphQLString as StringType,
} from 'graphql';
import UserSchemas from '../schemas/UserSchemas';
import {
  UsersModel,
} from '../models';

const me = {
  type: UserSchemas,
  resolve({ request }) {
    console.log(request.user, 'request.user');
    return UsersModel().findOne({_id: request.user.id});
  },
};

export default me;
