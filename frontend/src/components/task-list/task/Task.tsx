import React from 'react';
import { Reorder, useDragControls, useMotionValue } from 'framer-motion';
import "./Task.scss";
import DeleteBtn from './delete-btn/DeleteBtn';
import { useRaisedShadow } from './useRaisedShadow';

interface TaskProps {
    task: {
        id: number;
        title: string;
        completed: boolean;
        position: number;
    };
    onDelete: (id: number) => void;
    onToggleCompleted: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onToggleCompleted }) => {
    const controls = useDragControls();
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);

    return (
        <Reorder.Item
            value={task}
            id={task.id.toString()}
            style={{ boxShadow, y }}
            dragListener={false}
            dragControls={controls}
            className="Task"
        >
            <span className='TaskInnerWrapper'>
                <span
                    className="reorder-handle"
                    onPointerDown={(e) => controls.start(e)}
                >
                    &#9776; {/* Icon for handle */}
                </span>
                <input type="checkbox" checked={task.completed} onChange={() => onToggleCompleted(task.id)} />
                <span className="TaskTitle">{task.title}</span>
                <DeleteBtn onDelete={onDelete} id={task.id} />
            </span>
        </Reorder.Item>
    );
};

export default Task;
