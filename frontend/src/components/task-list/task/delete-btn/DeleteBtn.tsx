import React from 'react';

interface DeleteBtnProps {
    id: number;
    onDelete: (id: number) => void;
}

const DeleteBtn: React.FC<DeleteBtnProps> = ({ id, onDelete}) => (
    <button onClick={() => onDelete(id)}>
        x
    </button>
);

export default DeleteBtn;