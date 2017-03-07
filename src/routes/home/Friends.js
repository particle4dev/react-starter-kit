import React, { PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'
import { Label } from 'react-bootstrap'
import UserIcon from '../../components/UserIcon';

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
        <Label bsStyle="success">{ friends.totalFriends } friends</Label><br />
        {friends.friends.map(item => (
          <UserIcon
            avatar={item.profile.picture}
            key={item._id}
            username={item.username}
            onClick={(evt) => {
              evt.preventDefault();
              removeFriend(item._id);
            }} />
        ))}
      </div>
    );
  }
}

export default Friends;
