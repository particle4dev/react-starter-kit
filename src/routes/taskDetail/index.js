/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import TaskDetail from './TaskDetail';

const title = 'Task Detail';

export default {

  path: '/tasks/:id',

  action(ctx, { id }) {
    return {
      title,
      component: <Layout><TaskDetail title={title} taskId={id}/></Layout>,
    };
  },

};
