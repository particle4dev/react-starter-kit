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
import gql from 'graphql-tag';

const getme = gql`query me {
  me {
    _id,
    username,
    profile {
      picture
    }
  }
}`;

class Profile extends React.Component {
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
  };

  render() {
    const { data: { loading, me } } = this.props;
    console.log(me, 'me');
    return (
      <div>
        {!loading && <div>
          <p> me._id | { me._id }</p>
          <p> me.username | { me.username } </p>
          <p> me.profile.picture | <img src={ me.profile.picture } /> </p>
          </div>
        }
      </div>
    );
  }
}

export default compose(
  graphql(getme),
)(Profile);
