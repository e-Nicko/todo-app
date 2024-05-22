import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import "./App.css";

// Тип для задачи
type TaskType = {
  id: number;
  title: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  async function addTask(title: string) {
    const response = await fetch("http://localhost:8000/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    return response.json();
  }

  // Загрузка всех задач
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8000/tasks/");
        const data = await response.json();
        if (data.length === 0) {
          console.log("No tasks found");
        } else {
          console.log("Tasks:", data);
          setTasks(data);  // Устанавливаем задачи в состояние
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Добавление новой задачи
  const handleAddTask = async (title: string) => {
    const newTask = await addTask(title);
    setTasks([newTask, ...tasks]);
  };

  // Переключение состояния задачи (completed)
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
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      }
    }
  };

  // Удаление задачи
  const handleDeleteTask = async (id: number) => {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div id="App">
      <h1>
        Todo List<sup className="version">v0.1.0</sup>
      </h1>
      <AddTask onAdd={handleAddTask} />
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
