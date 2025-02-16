import { useState, useEffect } from "react";

const TodoBody = () => {
    const [task, setTask] = useState("");  // track task input value
    const [tasks, setTasks] = useState([]); // store tasks
    const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited
    const [editingTitle, setEditingTitle] = useState(""); // Temporary title during editing

    // Fetch tasks from backend when the component is mounted
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch("http://localhost:5000/todos");
            const data = await response.json();
            setTasks(data); // Set tasks from the server
        };
        fetchTasks();
    }, []); // Empty dependency array means this runs once when component mounts

    // POST
    const addTask = async () => {
        if (task.trim()) { // if input is not empty
            const newTask = { title: task }; // Create task object
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });

            const createdTask = await response.json();
            setTasks([...tasks, createdTask]); // setState
            setTask(""); // Clear input field
        }
    };

    // PUT - toggle completion
    const toggleTaskCompletion = async (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);

        await fetch(`http://localhost:5000/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: !tasks.find(task => task.id === id).completed }),
        });
    };

    // PUT - update title
    const updateTaskTitle = async (id, newTitle) => {
        if (!newTitle.trim()) return;

        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, title: newTitle } : task
        );
        setTasks(updatedTasks);
        setEditingTaskId(null);

        await fetch(`http://localhost:5000/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTitle }),
        });
    };

    // DELETE
    const deleteTask = async (id) => {
        const response = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (data.message === "Todo deleted") {
            setTasks(tasks.filter((task) => task.id !== id));
        } else {
            console.error("Deletion error:", data.message);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center gap-6 m-12 p-12 rounded-xl border-1 border-solid border-red-300 bg-gradient-to-br from-gray-800 via-indigo-700 to-gray-300">
            <h1 className="text-5xl">Add Task</h1>
            <div className="flex flex-row items-center justify-center gap-6 transition-all duration-300">
                <input type="text"
                    value={task} // bind input value to state
                    onChange={(e) => setTask(e.target.value)} // update state on change
                    className="border border-red-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700" />
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-700 text-white transition-colors duration-300 hover:bg-indigo-500"
                    onClick={addTask}>
                    <p className="text-center">+</p>
                </button>
            </div>
            <ul className="custom-scroll flex flex-col items-start justify-start gap-4 w-full max-h-60 overflow-y-auto">
                {tasks.map((task) => (
                    <li
                        key={task.id} // Use unique ID as key to map data
                        className={`flex items-center justify-between w-9/12 p-4 rounded-lg shadow-lg duration-300 ${task.completed
                            ? "bg-red-300 hover:bg-red-500 text-gray-200"
                            : "bg-teal-700 hover:bg-teal-500"
                            }`}
                    >
                        <div className="flex items-center">
                            {editingTaskId === task.id ? (
                                <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    onBlur={() => updateTaskTitle(task.id, editingTitle)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") updateTaskTitle(task.id, editingTitle);
                                    }}
                                    autoFocus
                                    className="border p-2 rounded-md bg-white text-gray-800"
                                />
                            ) : (
                                <span
                                    className={`cursor-pointer p-2 rounded-md bg-indigo-500 hover:bg-indigo-300 hover:text-gray-800 ${task.completed ? "line-through" : ""}`}
                                    onClick={() => toggleTaskCompletion(task.id)}
                                    onDoubleClick={() => {
                                        setEditingTaskId(task.id);
                                        setEditingTitle(task.title);
                                    }}
                                >
                                    {task.title}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="flex items-center justify-center ml-4 bg-red-800 w-8 h-8 rounded-full p-2 text-white hover:bg-red-400 transition-all"
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default TodoBody;
