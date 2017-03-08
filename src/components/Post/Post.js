import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Post.css';
import Link from '../Link';

function Post({ ...props }) {
  const { data: {_id, title, owner: { username }} } = props;
  return (
    <div className={styles.streamPost}>
      <div className={styles.spAuthor}>
        <a href="#" className={styles.spAuthorAvatar}>
          <img
            src="https://resizing.flixster.com/kXU09EtyP2WYQq2MeEAkevOEgO4=/206x305/v1.bTsxMTE3Njc5MjtqOzE3MzE5OzEyMDA7ODAwOzEyMDA"
            alt="" />
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
