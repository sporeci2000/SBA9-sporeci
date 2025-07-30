import React from 'react';
import type { Task } from '../../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void; // new prop
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => (
    <ul>
        {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
        ))}
    </ul>
);
