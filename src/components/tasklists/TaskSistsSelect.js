import React from 'react';

const TaskListsSelect = ({taskLists, onChange}) => (
  <div className="form-group">
    <label for="tasks_lists_select">Списки задач</label>
    <select id="tasks_lists_select" className="form-control" onChange={  onChange}>
      {taskLists && taskLists.map(taskList => (
        <option value={taskList.id} key={taskList.id}>{taskList.title}</option>
      ))}
    </select>
  </div>
);

export default TaskListsSelect;