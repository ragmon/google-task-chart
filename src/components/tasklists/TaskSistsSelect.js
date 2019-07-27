import React from 'react';

const TaskListsSelect = ({taskLists, onChange}) => (
  <div className="form-group">
    <label htmlFor="tasks_lists_select">Списки задач</label>
    <select id="tasks_lists_select" className="form-control" onChange={onChange}>
      <option value={null}>-</option>
      {taskLists && taskLists.map(taskList => (
        <option value={taskList.id} key={taskList.id}>{taskList.title}</option>
      ))}
    </select>
  </div>
);

export default TaskListsSelect;