/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';
import todos from './queries/todos';
import users from './queries/users';

import getTask from './queries/getTask';
import makeTaskDone from './mutation/makeTaskDone';
import createNewTask from './mutation/createNewTask';
import deleteTask from './mutation/deleteTask';

const schema = new Schema({
  query: new ObjectType({
    name: 'RootQuery',
    fields: {
      me,
      users,
      news,
      todos,
      getTask,
    },
  }),
  mutation: new ObjectType({
    name: 'RootMutation',
    fields: {
      makeTaskDone,
      createNewTask,
      deleteTask,
    },
  }),
});

export default schema;
