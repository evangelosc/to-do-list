import React from 'react';
import "./App.css";

export class App extends React.Component {
  state = {
      input: "",
      history: [],
      active: 0
    };

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.input !== "") {
      const history = [...this.state.history];
      history.push({
        input: this.state.input
      });

      this.setState({
        input: "",
        history: history
      });
      localStorage.setItem("history", JSON.stringify(history));
    } else {
      alert("Please enter a task!");
    }
  };

  componentDidMount() {
    const savedHistory = JSON.parse(localStorage.getItem("history"));
    if (savedHistory) {
      this.setState({
        history: savedHistory
      });
    }
  };

  clearList = () => {
    localStorage.clear();
    this.setState({
      history: []
    });
  };

  delete = (index) => {
    const history = [...this.state.history];
    history.splice(index, 1);
    this.setState({
      history: history
    });
    localStorage.setItem("history", JSON.stringify(history));
  };

  checked = (event) => {
    let total = this.state.active;
    if (event.target.checked) {
      total+=1;
    } else {
      total-=1;
    }
    this.setState({
      active: total
    });
  };

  render() {
    return (
      <div>

        <div className="jumbotron jumbotron-fluid p-8 mb-5 bg-info text-white">
          <div className="container">
            <h1 className="display-4">To Do-List</h1>
            <p className="lead">Save your tasks...</p>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-group mb-3">
                  <input className="form-control" placeholder="Enter new task" type="text" value={this.state.input} onChange={this.handleChange} />
                  <div className="input-group-append">
                    <button className="btn btn-secondary btn-lg btn" type="submit">Add</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-1"></div>
            Total: {this.state.history.length}
        </div>

        <div className="row">
          <div className="col-1"></div>
            Completed: {this.state.active}
        </div>

        {this.state.history.map((item, index) => {
          return (
            <div key={index}>
              <hr />
              <div className="container">
                <div className="row justify-content-center">

                  <div className="col">
                    <input type="checkbox" onChange={this.checked}/>
                  </div>

                  <div className="col-6">
                    <ul>
                      <li key={index}>
                        <span>{item.input}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="col">
                    <button className="btn btn-secondary" onClick={this.delete.bind(this, index)}>Delete</button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        <div className="row">
          <div className="col-1"></div>
          {this.state.history.length > 0 ? (
            <div>
              <button className="btn btn-secondary" onClick={this.clearList}>Clear List</button>
            </div>
          ): null}
        </div>

      </div>
    );
  };
};

export default App;