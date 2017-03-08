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
import s from './PostDetail.css';

import gql from 'graphql-tag';
const getPost = gql`query postDetailQuery ($_id: String!) {
  post (_id: $_id) {
    _id,
    title,
    done,
    owner {
      username
    }
  }
}`;

class TaskDetail extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const {title, data: { loading, post }} = this.props;
    return (
      <div className={s.root}>
        {!loading && <div className={s.container}>
          <h1>{title}</h1>
          <p>id: {post._id}</p>
          <p>title: {post.title}</p>
          <p>done: {post.done}</p>
          <p>owner.username: {post.owner.username}</p>
        </div>}
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getPost, {
    options: (ownProps) => {
      return {
        variables: {
          _id: ownProps.postId
        }
      };
    }
  }),
)(TaskDetail);
