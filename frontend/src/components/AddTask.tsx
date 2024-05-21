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

    return (
        <form className="addTask" onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={title} onChange={
                (e) => setTitle(e.target.value)
                } 
            placeholder="Add new task" 
          />
          <button type="submit">Add</button>
        </form>
    );
};

export default AddTask;