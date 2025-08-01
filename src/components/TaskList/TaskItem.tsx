import React from 'react';
import type { Task } from '../../types';
import './TaskItem.css';

interface TaskItemProps {
    task: Task;
    onDelete: (id: string) => void; //function to delete a task by id
    onEdit: (task: Task) => void;  //function to start editing a task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => (
    <li className={`${task.priority} ${task.status}`}> {/*Renders one task item */}

        <strong>{task.title}</strong> | Status: {task.status} | Priority: {task.priority}
        <br />

        Description: {task.description || 'No description'}
        <br />

        Due Date: {task.dueDate || 'No due date'}
        <br />
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
);
