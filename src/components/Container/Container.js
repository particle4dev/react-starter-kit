import React, { Children } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Container.css';

function Container({ children }) {
  return (
    <div className={styles.container}>
      { children }
    </div>
  );
}

export default withStyles(styles)(Container);
