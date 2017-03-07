import React, { PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'
import { Panel, Button, Image } from 'react-bootstrap'

class Friends extends React.Component {

  static fragments = {
    myfriends: gql`
      fragment MyFriends on UserSchemas {
        friends {
          _id
          username
          profile {
            picture
          }
        }
        totalFriends
      }
    `
  }

  static propTypes = {
    myfriends: propType(Friends.fragments.myfriends).isRequired,
  };

  render() {
    const { friends, removeFriend } = this.props;
    return (
      <div>
        Friend <br />
        Total { friends.totalFriends } <br />
        {friends.friends.map(item => (
          <div key={item._id}>
            {item.username}
            <Image style={{width: 50, height: 50}} src={item.profile.picture} circle />
            <Button bsStyle="primary" onClick={(evt) => {
              evt.preventDefault();
              removeFriend(item._id);
            }}> Remove </Button>
          </div>
        ))}
      </div>
    );
  }
}

export default Friends;
