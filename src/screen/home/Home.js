import React from 'react';

const Home = React.createClass({

  state: {

  },

  render() {
    const tasks = this.state.tasks;

    return (
      <div>
        <h1>Home</h1>
        <label>Списки задач</label><br />
        <TaskLists />
      </div>
    );
  }
});

export default Home;