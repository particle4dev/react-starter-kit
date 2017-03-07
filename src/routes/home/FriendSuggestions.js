import React, { PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'
import UserIcon from '../../components/UserIcon';

class FriendSuggestions extends React.Component {

  static fragments = {
    myfriendsuggestions: gql`
      fragment FriendSuggestions on UserSchemas {
        friendSuggestions {
          _id
          username
          profile {
            picture
          }
        }
      }
    `
  }

  static propTypes = {
    myfriendsuggestions: propType(FriendSuggestions.fragments.myfriendsuggestions).isRequired,
  };

  render() {
    const { friends: { friendSuggestions }, addFriend } = this.props;
    return (
      <div>
        Friend Suggestions  <br />
        {friendSuggestions.map(item => (
          <UserIcon
            avatar={item.profile.picture}
            key={item._id}
            username={item.username}
            onClick={(evt) => {
              evt.preventDefault();
              addFriend(item._id);
            }} />
        ))}
      </div>
    );
  }
}

export default FriendSuggestions;
