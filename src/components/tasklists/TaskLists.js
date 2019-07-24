import React from 'react';
import PropTypes from 'prop-types';

class TaskLists extends React.Component {

  // propTypes: {
  //   tasks: PropTypes.arrayOf(PropTypes.object)
  // },

  render() {
    return (
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Completed</th>
        </tr>
        </thead>
        <tbody>
        {this.props.tasks && this.props.tasks.map(task => (
          <tr>
            <td>{task.title}</td>
            <td>{task.completed || '-'}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }

}

export default TaskLists;