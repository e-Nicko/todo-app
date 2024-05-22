import React, { useState } from 'react';

// Interface defining the props for AddTask component
interface AddTaskProps {
    onAdd: (title: string) => void;  // Function to handle adding a new task
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');  // State to keep track of the task title input

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();  // Prevent the default form submission behavior
        if (!title) return;  // If the title is empty, do nothing
        onAdd(title);
        setTitle('');
    };

    // Function to handle Enter key press in the input field
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
