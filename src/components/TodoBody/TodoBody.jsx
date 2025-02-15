import { useState } from "react";

const TodoBody = () => {
    const [task, setTask] = useState("");  // values tracking
    const [tasks, setTasks] = useState([]); // storing state of tasks


    const addTask = () => {
        if (task.trim()) { // if value is not empty
            setTasks([...tasks, { text: task, completed: false }]);  // add new task
            setTask("");  // clear field
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, idx) =>
            idx === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, idx) => idx !== index);
        setTasks(updatedTasks);
    };

    return (
        <section className="flex flex-col items-center justify-center gap-6 m-12 p-12 rounded-xl border-1 border-solid border-red-300 bg-gradient-to-br from-gray-800 via-indigo-700 to-gray-300">
            <h1 className="text-5xl">TodoBody</h1>
            <div className="flex flex-row items-center justify-center gap-6 transition-all duration-300">
                <input type="text"
                    value={task} // binding value to state
                    onChange={(e) => setTask(e.target.value)} // setState on change
                    className="border border-red-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700" />
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-700 text-white transition-colors duration-300 hover:bg-indigo-500"
                    onClick={addTask}>
                    <p className="text-center">+</p>
                </button>
            </div>
            <ul className="custom-scroll flex flex-col items-start justify-start gap-4 w-full max-h-60 overflow-y-auto">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className={`flex items-center justify-between w-9/12 p-4 rounded-lg shadow-lg duration-300 ${task.completed
                            ? "bg-red-300 hover:bg-red-500 text-gray-200"
                            : "bg-teal-700 hover:bg-teal-500"
                            }`}
                    >
                        <div className="flex items-center">
                            <span
                                className={`cursor-pointer p-2 rounded-md bg-indigo-500 hover:bg-indigo-300 hover:text-gray-800 ${task.completed ? "line-through" : ""}`}
                                onClick={() => toggleTaskCompletion(index)}
                            >
                                {task.text}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteTask(index)}
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
