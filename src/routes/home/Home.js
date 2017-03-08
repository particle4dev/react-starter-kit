/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import NewTask from '../../components/NewTask';
import Post from '../../components/Post';

import Profile from './Profile';
import Friends from './Friends';
import FriendSuggestions from './FriendSuggestions';
import { Grid, Row as R, Col, Clearfix } from 'react-bootstrap'

import s from './Home.css';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere'
import update from 'immutability-helper'
update.extend('$unset', function(_idsToRemove, original) {
  return original.filter((v) => _idsToRemove.indexOf(v._id) === -1);
});

const homePageQuery = gql`query homePageQuery {
  me {
    todos {
      _id,
      title,
      owner {
        username
      },
      done
    }
    ...MyProfile
    ...MyFriends
    ...FriendSuggestions
  }
}
${Profile.fragments.myprofile}
${Friends.fragments.myfriends}
${FriendSuggestions.fragments.myfriendsuggestions}
`;
const makeTaskDone = gql`mutation makeTaskDone ($_id: String!) {
  makeTaskDone(_id: $_id) {
    _id,
    done
  }
}`;

const createNewTask = gql`mutation createNewTask ($title: String!) {
  createNewTask(title: $title) {
    _id,
    title,
    done
  }
}`;

const deleteTask = gql`mutation deleteTask ($_id: String!) {
  deleteTask(_id: $_id) {
    _id
  }
}`;

const addFriend = gql`mutation addFriend ($_id: String!) {
  addFriend(_id: $_id) {
    _id
    username
    profile {
      picture
    }
  }
}`;

const removeFriend = gql`mutation removeFriend ($_id: String!) {
  removeFriend(_id: $_id) {
    _id
    username
    profile {
      picture
    }
  }
}`;

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    // mutate: PropTypes.func.isRequired,
    makeTaskDone: PropTypes.func.isRequired,
  };

  createNewTask = (evt, value) => {
    this.props.createNewTask(value);
  }

  render() {
    const { data: { loading, todos, me } } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>React.js News</h1>
          <Grid>
            <R className="show-grid">
              <Col xs={12} md={8}>
                <NewTask open onClick={this.createNewTask} />
                <div className="stream-posts">

                  {!loading && me.todos.map(item => (
                    <Post data={item}/>
                  ))}
                </div>

              </Col>
              <Col xs={6} md={4}>
                {!loading && <Profile me={filter(Profile.fragments.myprofile, me)} /> }
                <Clearfix />
                {!loading && <Friends removeFriend={this.props.removeFriend} friends={filter(Friends.fragments.myfriends, me)} /> }
                <Clearfix />
                {!loading && <FriendSuggestions addFriend={this.props.addFriend} friends={filter(FriendSuggestions.fragments.myfriendsuggestions, me)} /> }
              </Col>
            </R>
          </Grid>

        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(homePageQuery, {  options: { pollInterval: 20000 }}),
  // graphql(homePageQuery),

  graphql(makeTaskDone, {
    props: ({ mutate }) => ({
      // update
      makeTaskDone: _id => mutate({ variables: { _id } }),
    }),
  }),

  graphql(createNewTask, {
    props: ({ mutate }) => ({
      createNewTask: title => mutate({
        variables: { title },
        refetchQueries: [{
          query: homePageQuery,
        }],
      }),
    }),
  }),

  graphql(addFriend, {
    props: ({ mutate }) => ({
      addFriend: _id => mutate({
        variables: { _id },
        // refetchQueries: [{
        //   query: homePageQuery,
        // }],
        updateQueries: {
          // Would update the query that looks like:
          // query CommentQuery { ... }
          homePageQuery: (previousResult, { mutationResult }) => {
            console.log(mutationResult, previousResult, 'aaa');
            const newFriend = mutationResult.data.addFriend;
            console.log(newFriend._id, 'newFriend._id');
            return update(previousResult, {
              me: {
                friends: {
                  $unshift: [newFriend],
                },
                totalFriends: {
                  $set: ++previousResult.me.totalFriends
                },
                friendSuggestions: {
                  $unset: [newFriend._id],
                }
              },
            });
          },
        },
      }),
    }),
  }),

  graphql(removeFriend, {
    props: ({ mutate }) => ({
      removeFriend: _id => mutate({
        variables: { _id },
        // refetchQueries: [{
        //   query: homePageQuery,
        // }],
        updateQueries: {
          // Would update the query that looks like:
          // query CommentQuery { ... }
          homePageQuery: (previousResult, { mutationResult }) => {
            const newFriend = mutationResult.data.removeFriend;
            return update(previousResult, {
              me: {
                friendSuggestions: {
                  $unshift: [newFriend],
                },
                totalFriends: {
                  $set: --previousResult.me.totalFriends
                },
                friends: {
                  $unset: [newFriend._id],
                }
              },
            });
          },
        },
      }),
    }),
  }),

  graphql(deleteTask, {
    props: ({ mutate }) => ({
      deleteTask: _id => mutate({
        variables: { _id },
        refetchQueries: [{
          query: homePageQuery,
        }],
      }),
    }),
  }),
)(Home);
