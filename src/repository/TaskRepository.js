class TaskRepository extends Repository {
  get(taskList, task) {
    return gapi.client.tasks.tasks.get({taskList, task});
  }

  list(taskList, ...props) {
    return gapi.client.tasks.tasks.list({taskList, ...props});
  }
}