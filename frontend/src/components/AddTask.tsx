import React, { useState } from 'react';

interface AddTaskProps {
    onAdd: (title: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;
        onAdd(title);
        setTitle('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <form className="addTask" onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            onKeyDown={handleKeyDown}
            placeholder="Add new task" 
          />
          <button type="submit">Add</button>
        </form>
    );
};

export default AddTask;