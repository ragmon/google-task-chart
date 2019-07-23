import React from 'react';

const TaskLists = React.createClass({

  render() {
    return (
      <table>
        <thead>
        <th>Title</th>
        <th>Completed</th>
        </thead>
        <tbody>
        {tasks.map(task => (
          <tr>
            <td>{task.title}</td>
            <td>{task.complete || '-'}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }

});

export default TaskLists;