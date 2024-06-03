import React, { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import Task from "./components/task/Task";
import AddTask from "./components/AddTask";
import "./App.scss";
import AppTitle from "./components/AppTitle/AppTitle";

// Type definition for a task
type TaskType = {
  id: number;
  title: string;
  completed: boolean;
  position: number;
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

  // Handle reordering tasks
  const handleReorder = (newOrder: TaskType[]) => {
    setTasks(newOrder);
    console.log("New order during drag:", newOrder);
  };

  // Handle when drag ends
  const handleDragEnd = async () => {
    console.log("Final order on drag end:", tasks);
    const reorderedTasks = tasks.map((task, index) => ({ id: task.id, position: index }));
    console.log("Sending reordered tasks to server:", reorderedTasks);

    try {
        const response = await fetch("http://localhost:8000/tasks/reorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tasks: reorderedTasks }),
        });

        if (response.ok) {
            console.log("Reordered tasks saved successfully");
        } else {
            console.error("Failed to save reordered tasks");
            const errorData = await response.json();
            console.error("Error details:", errorData);
        }
    } catch (error) {
        console.error("Error sending reordered tasks to server:", error);
    }
  };

  // Add event listener to detect pointer up event
  useEffect(() => {
    window.addEventListener('pointerup', handleDragEnd);
    return () => {
      window.removeEventListener('pointerup', handleDragEnd);
    };
  }, [tasks]);

  return (
    <div id="App">
      <div className="MainWrapper">
        <AppTitle />
        <AddTask onAdd={handleAddTask} loading={addTaskLoading} />
        <Reorder.Group
          axis="y"
          onReorder={handleReorder}
          values={tasks}
        >
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onToggleCompleted={handleToggleCompleted}
              onDelete={handleDeleteTask}
            />
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default App;
