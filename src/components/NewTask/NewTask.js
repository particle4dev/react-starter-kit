import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './NewTask.css';

class NewTask extends Component {

  constructor() {
    super(...arguments);
    this.state = {};
  }

  componentDidUpdate() {
    const { open } = this.props;
    if (open) {
      ReactDOM.findDOMNode(this.refs.todoText).focus();
    }
  }

  newTask = (evt) => {
    const { onClick } = this.props;
    onClick(evt, this.refs.todoText.value);
    this.refs.todoText.value = '';
  }

  handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      const { onClick } = this.props;
      onClick(evt, this.refs.todoText.value);
      this.refs.todoText.value = '';
    }
  }

  render() {
    const { open } = this.props;
    const className = [styles.newTask];
    if (open) {
      className.push(styles.show);
    }
    return (
      <div className={className.join(' ')}>
        <a className={styles.addNew} href="javascript:void(0)" onClick={this.newTask} >
          <i className="fa fa-plus" />
        </a>
        <input ref="todoText" placeholder="New task" onKeyPress={this.handleKeyPress} />
      </div>
    );
  }
}

export default withStyles(styles)(NewTask);
