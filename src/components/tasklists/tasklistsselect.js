const TaskListsSelect = ({tasklists}) => (
  <select>
    {tasklists.map(tasklist => (
      <option value={tasklist.id}>{tasklist.title}</option>
    ))}
  </select>
);

export default TaskListsSelect;