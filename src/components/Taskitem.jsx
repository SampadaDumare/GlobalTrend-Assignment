import React, { useContext } from 'react';
import taskContext from '../context/taskContext';

const Taskitem = (props) => {

    const context = useContext(taskContext);
    const { updateTask, deleteTask } = context;

    const { tasks } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">

                    <h5 className="card-title">{tasks?.title}</h5>
                    <p>{tasks.description}</p>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <p>Status: {tasks.status}</p>
                        <div className="dropdown mb-2">

                            <button className="btn btn-sm btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" onClick={() => updateTask(tasks._id, "ToDo")}>ToDo</button></li>
                                <li><button className="dropdown-item" onClick={() => updateTask(tasks._id, "InProgress")}>In Progress</button></li>
                                <li><button className="dropdown-item" onClick={() => updateTask(tasks._id, "Completed")}>Completed</button></li>
                            </ul>
                        </div>
                    </div>



                    <button className="btn btn-danger" onClick={() => deleteTask(tasks._id)}>Delete</button>

                </div>
            </div>
        </div>
    );
};

export default Taskitem;
