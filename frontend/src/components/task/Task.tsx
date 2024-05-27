import React from 'react';
import "./Task.scss";
import DeleteBtn from './delete-btn/DeleteBtn';

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
        <DeleteBtn onDelete={onDelete} id={id} />

    </div>
);

export default Task;