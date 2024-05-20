import React from 'react';

interface TaskProps {
    id: number;
    title: string;
    completed: boolean;
    onDelete: (id: number) => void;
    onToggleCompleted: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ id, title, completed, onDelete, onToggleCompleted }) => (
    <div className="Task">
        <input type="checkbox" checked={completed} onChange={() => onToggleCompleted(id)} />
        <span>{title}</span>
        <button onClick={() => onDelete(id)}>Delete</button>
    </div>
);

export default Task;