import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './AddButton.css';

function AddButton({ onClick }) {
  return (
    <div className={styles.add} onClick={onClick}>
      <i className="glyphicon glyphicon-plus"> Add </i>
    </div>
  );
}

export default withStyles(styles)(AddButton);
