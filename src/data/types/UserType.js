/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList
} from 'graphql';

import TodoType from './TodoType';

const UserType = new ObjectType({
  name: 'User',
  fields: {
    id: { type: new NonNull(ID) },
    username: { type: StringType },
    tasks: {
      type: new GraphQLList(TodoType),
      description: 'My todo task',
      resolve: function() {
        return [];
      }
    }
  },
});

export default UserType;
