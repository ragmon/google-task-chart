class TaskRepository  {
  static get(data) {
    return gapi.client.tasks.tasks.get(data);
  }

  static list(data) {
    return gapi.client.tasks.tasks.list(data);
  }
}

export default TaskRepository;