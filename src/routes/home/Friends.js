import React, { PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'
import { Panel, Image } from 'react-bootstrap'

class Friends extends React.Component {

  static fragments = {
    myfriends: gql`
      fragment MyFriends on UserSchemas {
        friends {
          username
        }
        totalFriends
      }
    `
  }

  static propTypes = {
    myfriends: propType(Friends.fragments.myfriends).isRequired,
  };

  render() {
    const { friends } = this.props;
    return (
      <Panel header=" My Friends">
        Total { friends.totalFriends } <br />
      </Panel>
    );
  }
}

export default Friends;
