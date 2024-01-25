//create a task tracker home page in which all my home pages will be listed with their title description and status being shown, with an option to edit and delete

import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Home.css";




function Home() {
    const [tasks, setTasks] = useState([]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: ""
    });

    const [showTaskDialog, setShowTaskDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editTask, setEditTask] = useState({
        _id: "",
        title: "",
        description: "",
        dueDate: ""
    });
    
    const handleAddDialog = () => {
        setShowAddDialog(true);
    };

    const handleCloseDialog = () => {
        setShowAddDialog(false);
        setNewTask({
            title: "",
            description: "",
            dueDate: ""
        });
    };

    const handleEditDialog = (task) => {
        setEditTask({
            _id: task._id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate
        });
        setShowEditDialog(true);
    };

    const handleEditCloseDialog = () => {
        setShowEditDialog(false);
        setEditTask({
            title: "",
            description: "",
            dueDate: ""
        });
    };

    const getTasks = async () => {
        const response = await fetch("http://localhost:8000/api/task/getAllTasks");
        const data = await response.json();
        return data["tasks"];
    }

    
    useEffect(() => {
        const fetchTasks = async () => {
        const tasks = await getTasks();
        setTasks(tasks);
        };
        fetchTasks();
    }, []);
    
    const handleDelete = async (id) => {
        console.log(id);
        await deleteTask(id);
        const tasks = await getTasks();
        
        setTasks(tasks);
    };

    const deleteTask = async (id) => {
        await fetch(`http://localhost:8000/api/task/deleteTask?taskId=${id}`, {
        method: "DELETE",
        });
    };

    
    const handleAddTask = async () => {
        const response = await fetch("http://localhost:8000/api/task/addTask", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
        });

        setShowAddDialog(false);
        setNewTask({
            title: "",
            description: "",
            dueDate: ""
        });
        const tasks = await getTasks();
        setTasks(tasks);
    }

    const handleEditTask = async () => {
        
        const response = await fetch("http://localhost:8000/api/task/updateTask", {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(editTask),
        });

        setShowEditDialog(false);
        setEditTask({
            title: "",
            description: "",
            dueDate: ""
        });
        const tasks = await getTasks();
        setTasks(tasks);
    }

    const handleCompleteTask=async(id)=>{
        const response = await fetch(`http://localhost:8000/api/task/completeTask?taskId=${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            });
        
            const tasks = await getTasks();
            setTasks(tasks);
    }

    const handleTaskClick = (task) => {
        setShowTaskDialog(true);
        setSelectedTask(task);
    };

    
    return (
        <div className="container">
        <h1>Task Tracker</h1>
        <table className="table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((task) => (
                <tr key={task.id}>
                <td><button
                                    className="button link-button"
                                    onClick={() => handleTaskClick(task)}
                                >
                                    {task.title}
                                </button></td>
                <td>{task.status}</td>
                <td>
                    <button className="button muted-button" onClick={()=>handleEditDialog(task)}>Edit</button>
                    <button
                    className="button muted-button"
                    onClick={() => handleDelete(task._id)}
                    >
                    Delete
                    </button>
                    <button
                    className="button muted-button"
                    onClick={() => handleCompleteTask(task._id)}
                    >
                    Change Status
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {showTaskDialog && selectedTask && (
                <div className="dialog">
                    <h2>{selectedTask.title}</h2>
                    <p><strong>Description:</strong> {selectedTask.description}</p>
                    <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
                    <p><strong>Status:</strong> {selectedTask.status}</p>
                    <button onClick={() => setShowTaskDialog(false)}>Close</button>
                </div>
            )}



            <button className="button" onClick={handleAddDialog}>Add New Task</button>
            {showAddDialog && (
                <div className="dialog">
                    <h2>Add New Task</h2>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <label>Due Date:</label>
                    <input
                        type="text"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                    <button onClick={handleAddTask}>Add Task</button>
                    <button onClick={handleCloseDialog}>Cancel</button>
                </div>
            )}


{showEditDialog && (
                <div className="dialog">
                    <h2>Add New Task</h2>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={editTask.title}
                        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        value={editTask.description}
                        onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                    />
                    <label>Due Date:</label>
                    <input
                        type="text"
                        value={editTask.dueDate}
                        onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                    />
                    <button onClick={handleEditTask}>Update</button>
                    <button onClick={handleEditCloseDialog}>Cancel</button>
                </div>
            )}
        </div>
        
    );
    }


export default Home;