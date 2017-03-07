import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Image } from 'react-bootstrap'
import styles from './UserIcon.css';

function UserIcon({ ...props }) {
  let { username, avatar, onClick } = props;
  return (
    <div className={styles.usericon}>
      <Image className={styles.image}
        src={avatar} rounded
        onClick={onClick}/>
      <h4 className={styles.username}>
        { username }
        <small>Algerian</small>
      </h4>
    </div>
  );
}

export default withStyles(styles)(UserIcon);
