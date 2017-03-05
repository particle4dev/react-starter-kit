import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Row.css';
import Link from '../Link';

function Row({ ...props }) {
  let { id, title, onRemove, onUpdate, done } = props;
  onRemove = onRemove.bind(null, id);
  onUpdate = onUpdate.bind(null, id, !done);
  const className = [styles.row, styles.uiSortableHelper];
  if (done) {
    className.push(styles.done);
  }
  return (
    <li className={className.join(' ')}>
      <a className={styles.remove} href="javascript:void(0)" onClick={onRemove}>
        <i className="fa fa-trash-o" />
      </a>
      <a className={styles.completed} href="javascript:void(0)" onClick={onUpdate}>
        <i className="fa fa-check" />
      </a>
      <Link to={`tasks/${id}`}>
        { title }
      </Link>
    </li>
  );
}

export default withStyles(styles)(Row);
