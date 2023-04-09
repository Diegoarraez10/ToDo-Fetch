import React, { useEffect, useState } from "react";

const Home = () => {
  const urlApi = "https://assets.breatheco.de/apis/fake/todos/";

  const [Tasks, setTasks] = useState([]);
  const [TaskName, setTaskName] = useState("");
  const handleTaskChange = (event) => {
    setTaskName(event.target.value);
  };

  const getTasks = async () => {
    try {
      const response = await fetch("https://express-blog-xa7v.onrender.com/", {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
    } catch (error) {}
  };
  useEffect(() => {
    getTasks();
  }, []);

  const handleAddEnter = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      const newTask = {
        accion: TaskName,
      };
      const newTasks = [...Tasks, newTask];
      setTasks(newTasks);
      setTaskName("");
    }

    const handleRemove = (id) => {
      setTasks(Tasks.filter((item, index) => index != id));
    };
  };
  const handleAddClick = () => {
    const newTask = {
      accion: TaskName,
    };
    const newTasks = [...Tasks, newTask];
    setTasks(newTasks);
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
              value={TaskName}
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
                    key={`${task.accion}-${index}`}
                  >
                    <p>{task.accion}</p>
                    <button
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => handleRemove(index)}
                    ></button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="card-footer bg-success">{Tasks.length} tasks left.</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
