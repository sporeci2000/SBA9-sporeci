import React from 'react';
import type { Task } from '../../types';

interface TaskItemProps {
    task: Task;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => (
    <li>
        <strong>{task.title}</strong> — {task.status} — {task.priority}
        <br />
        Description: {task.description || 'No description'}
        <br />
        Due Date: {task.dueDate || 'No due date'}
        <br />
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
);
