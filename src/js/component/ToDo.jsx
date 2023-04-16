import React, { useEffect, useState } from "react";

const Home = () => {
  const urlApi = "https://assets.breatheco.de/apis/fake/todos/user/DiegoArraez";

  const [error, setError] = useState(false);
  const [Tasks, setTasks] = useState([]);
  const [TaskName, setTaskName] = useState({ done: false, label: "" });
  const handleTaskChange = (event) => {
    setTaskName({ ...TaskName, label: event.target.value });
  };

  const createUser = async () => {
    try {
      let response = await fetch(`${urlApi}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      });
      if (response.ok) {
        getTasks();
      } else {
        alert("El usuario no se ha creado");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const newTask = (e) => {
    setTasks({
      ...Tasks,
      [e.target.name]: e.target.value,
    });
  };

  const getTasks = async () => {
    try {
      setError(false);
      let response = await fetch(`${urlApi}`);
      let results = await response.json();
      if (response.ok) {
        setTasks(results);
      } else {
        createUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const upTask = async () => {
    try {
      if (TaskName.label.trim() != "") {
        let response = await fetch(`${urlApi}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([...Tasks, TaskName]),
        });
        if (response.ok) {
          getTasks();
          setError(false);
        } else {
          console.log(response.status);
        }
      } else {
        setError(true);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEnter = (event) => {;
    if (event.key === "Enter") {
      upTask();
      setTaskName("");
    }
  };
  const deleteTask = async (id) => {
    try {
      let newListTask = Tasks.filter((item, index) => index != id);
      console.log(newTask.length);
      if (newListTask.length == 0) {
        newListTask = [{ done: false, label: "test" }];
      }
      let response = await fetch(`${urlApi}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newListTask),
      });
      if (response.ok) {
        getTasks();
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddClick = () => {
    upTask();
    setTaskName("");
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="text-center w-50">
        <h1 className="text-center mt-5">Task's to do</h1>
        <div className="card m-5 ">
          <div className="card-header bg-success">
            <input
              type="text"
              placeholder="New task"
              onChange={(event) => handleTaskChange(event)}
              onKeyDown={(event) => handleAddEnter(event)}
              value={TaskName.label}
            />
            <button onClick={() => handleAddClick()}>Add me</button>
          </div>
          <div className="card-body bg-success">
            {Tasks.length === 0 && <p>no tasks</p>}
            <ul className="list-group list-group-flush ">
              {Tasks.map((task, index) => {
                return (
                  <li
                    className="list-group-item d-flex justify-content-between"
                    key={`${task.label}-${index}`}
                  >
                    <p>{task.label}</p>
                    <button
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => deleteTask(index)}
                    ></button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="card-footer bg-success">
            {Tasks.length} tasks left.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
