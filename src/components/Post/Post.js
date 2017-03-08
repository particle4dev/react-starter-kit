import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Post.css';
import Link from '../Link';

function Post({ ...props }) {
  const { data: {_id, title, owner: { username, profile: {picture} }} } = props;
  return (
    <div className={styles.streamPost}>
      <div className={styles.spAuthor}>
        <a href="#" className={styles.spAuthorAvatar}>
          <img src={picture} alt="" />
        </a>
        <h6 className="sp-author-name">{ username }</h6>
      </div>
       <div className={styles.spContent}>
          <Link to={`posts/${_id}`}>
            <div className="sp-info">posted 1h ago</div>
          </Link>
          <p className="sp-paragraph mb-0">
            {title}
          </p>
       </div>
    </div>
  );
}

export default withStyles(styles)(Post);
