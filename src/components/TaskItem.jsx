import { useContext } from "react";
import TaskContext from "../TaskContext";

export default function TaskItem({ title, description, completed, id }) {
  const { deleteTasks, markAsComplete } = useContext(TaskContext);

  return (
    <div
      className="border rounded text-center p-3 task-box"
      style={{
        minWidth: "15rem",
        maxWidth: "15rem",
        height: "30vh",
        overflow: "auto",
      }}
    >
      <h3 style={{ fontFamily: "Almendra", fontSize: "xx-large" }}>{title}</h3>
      <p style={{ fontFamily: "Charmonman", fontSize: "x-large" }}>
        {description}
      </p>
      <p style={{ fontFamily: "Cinzel", fontSize: "large" }}>
        Status: {completed ? "Completed" : "Pending"}
      </p>

      <div className="d-flex gap-2 justify-content-center">
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#deleteTask"
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        {!completed && (
          <button
            className="btn btn-success"
            onClick={() => markAsComplete(id)}
          >
             <i className="fa fa-check" aria-hidden="true"></i>
          </button>
        )}
      </div>

      <div>
        <div
          className="modal fade"
          id="deleteTask"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="deleteTaskLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteTaskLabel">
                  Delete Task
                </h5>
                <button
                  type="button"
                  className="close btn btn-danger"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Are You Sure Want To Delete This Task ?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    deleteTasks(id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
