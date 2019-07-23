class TaskListRepository extends Repository {
  get(taskList) {
    return gapi.client.tasks.tasklists.get({taskList});
  }

  list(data) {
    return gapi.client.tasks.tasklists.list(data);
  }
}