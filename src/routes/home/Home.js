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

import AddButton from '../../components/AddButton';
import NewTask from '../../components/NewTask';
import Row from '../../components/Row';
import Container from '../../components/Container';

import s from './Home.css';
import gql from 'graphql-tag';

const newsQuery = gql`query newsQuery {
  todos (limit: 3) {
    _id,
    title,
    done
  }
}`;

const makeTaskDone = gql`mutation makeTaskDone ($id: String!) {
  makeTaskDone(id: $id) {
    id,
    done
  }
}`;

const createNewTask = gql`mutation createNewTask ($title: String!) {
  createNewTask(title: $title) {
    id,
    title,
    done
  }
}`;

const deleteTask = gql`mutation deleteTask ($id: String!) {
  deleteTask(id: $id) {
    id
  }
}`;

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      news: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        content: PropTypes.string,
      })),
      todos: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
      })),
    }).isRequired,
    // mutate: PropTypes.func.isRequired,
    makeTaskDone: PropTypes.func.isRequired,
  };

  createNewTask = (evt, value) => {
    this.props.createNewTask(value);
  }

  render() {
    const { data: { loading, todos } } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>React.js News</h1>
          <Container>
            <NewTask open onClick={this.createNewTask} />
            {/** <AddButton onClick={this.onClick} />*/}
            {!loading && todos.map(item => (
              <Row key={item.id}
                id={item.id}
                title={item.title}
                onUpdate={() => this.props.makeTaskDone(item.id)}
                onRemove={() => this.props.deleteTask(item.id)}
                done={item.done} />
            ))}
          </Container>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  // graphql(newsQuery, {  options: { pollInterval: 20000 }}),
  graphql(newsQuery),
  graphql(makeTaskDone, {
    props: ({ mutate }) => ({
      makeTaskDone: id => mutate({ variables: { id } }),
    }),
  }),
  graphql(createNewTask, {
    props: ({ mutate }) => ({
      createNewTask: title => mutate({
        variables: { title },
        refetchQueries: [{
          query: newsQuery,
        }],
      }),
    }),
  }),
  graphql(deleteTask, {
    props: ({ mutate }) => ({
      deleteTask: id => mutate({
        variables: { id },
        refetchQueries: [{
          query: newsQuery,
        }],
      }),
    }),
  }),
)(Home);
