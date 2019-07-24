import React, { Component } from 'react';

import TaskLists from '../../components/tasklists/TaskLists';
import TaskListsSelect from "../../components/tasklists/TaskSistsSelect";
import Developers from '../../components/developers/Developers';

import TaskListRepository from '../../repository/TaskListRepository';
import TaskRepository from '../../repository/TaskRepository';
import GAPI from "../../GAPI";

// import PieChart from '../../components/charts/PieChart';
import Chart from 'react-google-charts';

class Home extends Component {

  // getInitialState() {
  //   // this.loadTaskLists();
  //
  //   return {
  //     taskLists: [],
  //     tasks: []
  //   };
  // }

  constructor(props) {
    super(props);

    // this.clearTasks = this.clearTasks.bind(this);

    this.state = {
      task_lists: [],
      tasks: [],
      tasks_done: 5,
      tasks_not_done: 3,
      showChart : false
    };
  }

  componentWillMount() {
    //
    console.log('componentWillMount');
  }
  componentWillUnmount() {
    // Lifecycle function that is triggered just before a component unmounts
    console.log('componentWillUnmount');
  }

  componentDidMount() {
    console.log('componentDidMount');
    //
    // this.loadTaskLists();
    if (GAPI.isInit()) {
      this.loadTaskLists();
    } else {
      GAPI.initGoogleApi().then(() => {
        this.loadTaskLists();
      })
    }
  }

  // async loadTaskLists() {
  //   const data = {
  //     maxResults: 250,
  //     pageToken: ''
  //   };
  //
  //   do {
  //     let response = await TaskListRepository.list(data);
  //     this.setState({taskLists: response.items});
  //     data['pageToken'] = response.nextPageToken;
  //   }
  //   while ('nextPageToken' in response);
  // },
  //
  // async loadTasks() {
  //   const data = {
  //     maxResults: 250,
  //     pageToken: ''
  //   };
  //
  //   do {
  //     let response = await TaskRepository.list(data);
  //     this.setState({tasks: response.items});
  //     data['pageToken'] = response.nextPageToken;
  //   } while ('nextPageToken' in response);
  // },

  loadTaskLists(nextPageToken) {
    const data = {
      maxResults: 2500
      // pageToken: nextPageToken
    };
    if (nextPageToken) data['pageToken'] = nextPageToken;
    TaskListRepository.list(data).then((response) => {
      console.log('TaskListRepository.list(data).then', response);
      this.setState({task_lists: response.result.items});
      // Next fetching iteration
      if ('nextPageToken' in response && response.items.length > 0) {
        console.log(response, response.items.length);
        this.loadTaskLists(response.nextPageToken);
      }
    });
  }

  loadTasks(nextPageToken, tasklist) {
    const data = {
      tasklist : tasklist,
      maxResults: 2500,
      "showCompleted": true,
      // "showDeleted": true,
      "showHidden": true
      // pageToken: nextPageToken
    };
    if (nextPageToken) data['pageToken'] = nextPageToken;

    console.log('loadTasks(nextPageToken, tasklist); data = ', data);

    return TaskRepository.list(data).then((response) => {
      this.setState({tasks: response.result.items});
      // Next fetching iteration
      if ('nextPageToken' in response) {
        this.loadTaskLists(response.nextPageToken, tasklist);
      }
    });
  }

  clearTasks() {
    this.setState({tasks: []});
  }

  onSelectTaskLists(e) {
    const taskListsID = e.target.value;
    console.log('onSelectTaskLists', taskListsID);

    this.setState({showChart : false});
    this.clearTasks();
    this.loadTasks(null, taskListsID).then(() => this.calcTasksForChart());

    setTimeout(() => console.log(this.state), 3000);
  }

  calcTasksForChart() {
    let done = 0;
    let notDone = 0;
    this.state.tasks.forEach((task) => {
      if ('completed' in task) {
        done++;
      } else {
        notDone++;
      }
    });

    this.setState({
      tasks_done: done,
      tasks_not_done: notDone,
      showChart : true
    });
  }

  render() {
    return (
      <div>
        <h1>GTask Summary</h1>
        <TaskListsSelect taskLists={this.state.task_lists} onChange={this.onSelectTaskLists.bind(this)}/>

        { this.state.showChart ?
          <Chart
            // width={'500px'}
            // height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Task', 'Hours per Day'],
              ['Done', this.state.tasks_done],
              ['Not Done', this.state.tasks_not_done]
            ]}
            options={{
              title: 'My Daily Activities',
            }}
            rootProps={{ 'data-testid': '1' }}
          />
          : null  }


        <TaskLists tasks={this.state.tasks}/>
        <Developers />
      </div>
    );
  }

};

export default Home;