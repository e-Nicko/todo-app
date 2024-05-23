import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import "./App.css";

// Type definition for a task
type TaskType = {
  id: number;
  title: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [addTaskLoading, setAddTaskLoading] = useState<boolean>(false);

  // Fetch all tasks from the server when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8000/tasks/");
        const data = await response.json();
        if (data.length === 0) {
          console.log("No tasks found");
        } else {
          console.log("Tasks:", data);
          // Set the fetched tasks to the state
          setTasks(data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Handle adding a new task
  const handleAddTask = async (title: string) => {
    setAddTaskLoading(true);
    try {
      const newTask = await addTask(title);
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setAddTaskLoading(false);
    }
  };
  
  // Function to add a new task
  async function addTask(title: string) {
    setAddTaskLoading(true);
    const response = await fetch("http://localhost:8000/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
    return response.json();
  }

  // Handle toggling the completed state of a task
  const handleToggleCompleted = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      const response = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        // Update the task in the state
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      }
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id: number) => {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // Remove the task from the state
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div id="App">
      <h1>
        Todo List<sup className="version">v0.1.1</sup>
      </h1>
      <AddTask onAdd={handleAddTask} loading={addTaskLoading} />
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          onToggleCompleted={handleToggleCompleted}
          onDelete={handleDeleteTask}
        />
      ))}
    </div>
  );
};

export default App;