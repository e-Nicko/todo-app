import React from 'react';
import { Reorder } from 'framer-motion';
import Task from 'src/components/task-list/task/Task';
import 'src/components/task-list/TaskList.scss';

type TaskType = {
  id: number;
  title: string;
  completed: boolean;
  position: number;
};

interface TaskListProps {
  tasks: TaskType[];
  onReorder: (tasks: TaskType[]) => void;
  onToggleCompleted: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onReorder, onToggleCompleted, onDelete }) => {
  return (
    <Reorder.Group
      className="TaskList"
      axis="y"
      onReorder={onReorder}
      values={tasks}
    >
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleCompleted={onToggleCompleted}
          onDelete={onDelete}
        />
      ))}
    </Reorder.Group>
  );
};

export default TaskList;