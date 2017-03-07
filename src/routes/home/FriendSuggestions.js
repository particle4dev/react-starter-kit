import React, { PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'
import { Panel, Button, Image } from 'react-bootstrap'

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
    const { friends: { friendSuggestions } } = this.props;
    return (
      <Panel header='Friend Suggestions'>
        {friendSuggestions.map(item => (
          <div key={item._id}>
            {item.username}
            <Image style={{width: 50, height: 50}} src={item.profile.picture} circle />
            <Button bsStyle="primary"> Add Friend </Button>
          </div>
        ))}
      </Panel>
    );
  }
}

export default FriendSuggestions;
