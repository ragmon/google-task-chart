class TaskListRepository {
  static get(taskList) {
    return gapi.client.tasks.tasklists.get({taskList});
  }

  static list(data) {
    return gapi.client.tasks.tasklists.list(data);
  }
}

export default TaskListRepository;