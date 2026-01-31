import { useState } from "react";
import taskContext from "./taskContext";

const TaskState = (props) => {
    const [task, setTask] = useState([]);

    // get all Tasks
    const getAllTasks = async () => {
        // API call
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/fetchallTasks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        const data = await response.json();
        setTask(data)
    }

    // Add task
    const addTask = async ({ title, description, status }) => {
        // API call
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/addTask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, status })
        })
        const data = await response.json();
        setTask(task.concat(data));
    }

    // update task
    const updateTask = async (id, status) => {
        // API call
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/updatetasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ status })
        })
        const updatedTask = await response.json(); // ✅ get updated task

        // Update state using map (BEST way)
        setTask((prevTasks) =>
            prevTasks.map((t) =>
                t._id === id ? updatedTask : t
            )
        );
    }

    // delete task
    const deleteTask = async (id) => {
        // API call
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/deleteTask/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        const data = await response.json();

        // Remove from state (UI update)
        const newTasks = task.filter((a) => a._id !== id);

        setTask(newTasks);
    }

    // Filter tasks
    const filterTasks = async (status = "") => {

        let url = `${import.meta.env.VITE_APP_API_URL}/api/user/filter`;
        let params = [];
        if (status) {
            params.push(`status=${status}`);
        }
        if (params.length > 0) {
            url = url + "?" + params.join("&");
        }

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });

        const data = await response.json();

        setTask(data);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [username, setUsername] = useState(localStorage.getItem("username") || "");

    const login = (token, name) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", name);
        setIsLoggedIn(true);
        setUsername(name);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername("");
        setTask([]);
    }

    return (
        <taskContext.Provider value={{ task, getAllTasks, addTask, updateTask, deleteTask, filterTasks, isLoggedIn, username, login, logout }}>
            {props.children}
        </taskContext.Provider>
    )
}

export default TaskState;