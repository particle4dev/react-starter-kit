/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, compose } from 'react-apollo';
import s from './TaskDetail.css';

import gql from 'graphql-tag';
const getTask = gql`query getTask ($id: String!) {
  Todo (id: $id) {
    id,
    title,
    done
  }
}`;

class TaskDetail extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const {title, data: { todo }} = this.props;
    console.log(this.props);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getTask, {
    options: (ownProps) => {
      return {
        variables: {
          id: ownProps.taskId
        }
      };
    }
  }),
)(TaskDetail);
