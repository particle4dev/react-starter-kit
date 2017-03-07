import React, { PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'
import { Panel, Image } from 'react-bootstrap'

class Profile extends React.Component {

  static fragments = {
    myprofile: gql`
      fragment MyProfile on UserSchemas {
        _id
        username
        profile {
          picture
        }
      }
    `
  }

  static propTypes = {
    myprofile: propType(Profile.fragments.myprofile).isRequired,
    me: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      // picture
    })
  };

  render() {
    const { me } = this.props;
    return (
      <Panel header='My Profile'>
        ID | { me._id } <br />
        Username | { me.username } <br />
        <Image src={me.profile.picture} />
      </Panel>
    );
  }
}

export default Profile;
