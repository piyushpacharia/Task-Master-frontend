import React, { useContext, useEffect } from "react";
import TaskContext from "../TaskContext";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import Logo from "../images/logo.svg"
export default function RightSidebar() {
  const { masterTask, masterUser, fetchAllTasks, logout } =
    useContext(TaskContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!masterUser) {
      navigate("/");
    } else {
      fetchAllTasks();
    }
  }, [fetchAllTasks]);

  return (
    <div>
      <div
        className="row "
        style={{ width: "100vw", height: "100vh", overflow: "auto" }}
      >
        <div className="text-center" style={{ width: "100vw" }}>
          <div>
           
            <div className="f-flex justify-content-center">
              <img src={Logo} alt="" style={{width:"20rem"}} />
            </div>
            <div>
              <button
              className="mt-2 "
                onClick={logout}
                style={{ background: "none", border: "none", float: "right",fontSize:"large",backgroundColor:"#ffc107",borderRadius:"0.2rem"}}
              >
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </button>
            </div>
          </div>

         
          <div className="d-flex justify-content-center">
            <h2 className="text-center " style={{ fontFamily: "Cantora One",borderBottom:"1px solid black" }}>
              YOU HAVE TO DO THESE TASKS
            </h2>
          </div>
        </div>

        <div className="col-12 d-flex px-4">
          <div className="d-column"></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {masterTask.map((item, index) => (
              <TaskItem
                id={item._id}
                title={item.title}
                description={item.description}
                completed={item.completed}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className=""
        style={{ bottom: "2rem", position: "fixed", width: "100vw" }}
      >
        <button
          style={{ float: "right", marginRight: "10%" }}
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          +
        </button>
        <AddTask />
      </div>
    </div>
  );
}
