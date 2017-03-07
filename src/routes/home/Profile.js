import React, { PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'
import { Panel, Image, Clearfix } from 'react-bootstrap'

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
      <Panel style={{
        backgroundColor: '#f05050',
        color: '#ffffff',
      }}>
        <div className='text-center'>
          <Clearfix>
            <div className="pull-left">200 Following</div>
            <div className="pull-right">150 Followers</div>
          </Clearfix>
          <Image src={me.profile.picture} style={{
            width: '96px',
            height: '96px'
          }} circle/>
          <h4>{me.username}</h4>
          <p>
            San Francisco, California
          </p>
          <Clearfix>
            <div className="pull-left">15k Likes</div>
            <div className="pull-right">100 Feeds</div>
          </Clearfix>
        </div>
      </Panel>
    );
  }
}

export default Profile;
