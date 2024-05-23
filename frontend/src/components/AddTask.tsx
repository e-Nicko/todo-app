import React, { useState } from 'react';
import Spinner from './spinner/Spinner';

// Interface defining the props for AddTask component
interface AddTaskProps {
    onAdd: (title: string) => void;  // Function to handle adding a new task
    loading?: boolean;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd, loading}) => {
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
            disabled={loading}
          />
            <button type="submit">
                {loading ? <Spinner />:"Add"}
            </button>
        </form>
    );
};

export default AddTask;
