import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: "",
        completed: false,
      },
      editing: false,
    };
    this.fetchTask = this.fetchTask.bind(this);
    this.handelChange = this.handelChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.getCsrf = this.getCsrf.bind(this);
    this.infoIcon = this.infoIcon.bind(this);
  }
  componentDidMount() {
    // this.fetchTask();
    // document.getElementById('t-info').addEventListener('mouseover',this.infoIcon,false);
  }
  fetchTask(e) {
    console.log("featching.....");
    fetch("http://127.0.0.1:8000/api/task-list/")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          todoList: data,
        })
      );
    // if(this.state.todoList){
    //   this.addTask(e);
    // }
  }

  //get csrf token
  getCsrf(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // this method create a new task
  addTask(e) {
    e.preventDefault();
    let getDiv = document.getElementById("list-wrapper");
    let setDiv = document.createElement("div");
    setDiv.setAttribute('class','row');
    setDiv.setAttribute('id','new-task');
    setDiv.insertAdjacentHTML(
      "afterbegin",
      "<div class='col-sm-1'><i class='far fa-circle'></i>&nbsp;</div><div class='col-sm-11 task-wrapper flex-wrapper' id='new-inp'></div>"
    );
    let inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("class", "task-input flex-wrapper");
    // setDiv.appendChild(inputBox);
    setDiv.childNodes[1].appendChild(inputBox);
    getDiv.appendChild(setDiv);
    inputBox.focus();
    inputBox.addEventListener("keyup", this.handelChange, false);
  }
  
  //info on mouse over
  infoIcon(e){
    document.getElementById('info').insertAdjacentElement('afterbegin','<i class="fas fa-info-circle"></i>');
  }
  handelChange(e) {
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:e.target.value
      }
    });
    // console.log("TITLE",this.state.activeItem);
    if (e.keyCode === 13) {
     
      // let csrf = this.getCsrf("csrftoken");
      // fetch("http://127.0.0.1:8000/api/task-create/", {
      //   method: "POST",
      //   headers: {
      //     'Content-type': 'application/json',
      //     "X-CSRFToken": csrf,
      //   },
      //   body: JSON.stringify(this.state.activeItem),
      // }).then(
      //   ((response) => {
      //     // console.log(response);
      //     // this.fetchTask();
      //     this.setState({
      //       activeItem: {
      //         id: null,
      //         title: "",
      //         completed: false,
      //       },
      //     });
          // document.getElementById('new-task').remove();
          document.getElementById('submit').click();
      //   })
      // ).catch(function (error){
      //   console.log("ERROR",error);// shows the if any error occur in response
      // })
    } 
    // else {
    //   console.log(e.target.value);
    //   // console.log(e);
    // }
  }
 
  render() {
    let tasks = this.state.todoList;
    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <div className="row head">
              <div className="col-sm-6">
                <h2>Todo</h2>
              </div>
              <div className="col-sm-6">
                <button
                  type="button"
                  id="submit"
                  onClick={this.addTask}
                  className="btn btn-secondary"
                >
                  <i className="fas fa-plus-square"></i>
                </button>
              </div>
            </div>
            <div id="list-wrapper">
              {tasks.map(function (task, index) {
                return (
                  <div key={index} className="row">
                    <div className="col-sm-1">
                      <i className="far fa-circle"></i>&nbsp;
                    </div>
                    <div className="col-sm-10 task-wrapper flex-wrapper" id="t-info">
                      <p style={{ fontSize: "20px" }}>{task.title}</p>
                    </div>
                    <div className="col-sm-1" ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
