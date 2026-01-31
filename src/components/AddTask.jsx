import React, { useContext, useEffect, useState } from 'react'
import taskContext from '../context/taskContext';
import Taskitem from '../components/Taskitem';
import { useNavigate } from 'react-router-dom';


const AddTask = () => {
    const context = useContext(taskContext);
    const { task, getAllTasks, addTask, username } = context;
    const [tasks, setTasks] = useState({ title:"", description:"", status: "" })
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        addTask(tasks);
        setTasks({ title:"", description:"", status: "" })
        alert("Alert added successfully")
    }

    const onchange = (e) => {
        setTasks({ ...tasks, [e.target.name]: e.target.value })
    }

    useEffect(() => {
    if(localStorage.getItem("token")){
      getAllTasks();
    }
    else{
      navigate("/login");
    }
  }, [])

    return (
        <div className='container'>
            <span className="text-dark me-2">Hi, {username}</span>
            <form className='container my-3' onSubmit={onSubmit}>
                <h3 className='my-3'>Add Task</h3>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={tasks.title} onChange={onchange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" name='description' value={tasks.description} onChange={onchange} id="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select id="status" name='status' value={tasks.status} onChange={onchange} className="form-select">
                        <option value={""}>Select Status</option>
                        <option value={"ToDo"}>ToDo</option>
                        <option value={"InProgress"}>In Progress</option>
                        <option value={"Completed"}>Completed</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className=" row my-3">
                <h3>Your Tasks</h3>
                {task.length === 0 && <p>No task added yet</p>}
                {Array.isArray(task) && task.map((tasks) => {
                    return <Taskitem key={tasks._id} tasks={tasks} />
                })}
            </div>
        </div>
    )
}

export default AddTask
