import React, { useState } from 'react';
import type { TaskPriority, TaskStatus } from '../../types';

interface TaskFormProps {
    onAddTask: (task: {
        title: string;
        priority: TaskPriority;
        status: TaskStatus;
    }) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    //State Hooks
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('medium');
    const [status, setStatus] = useState<TaskStatus>('pending');
    const [error, setError] = useState('');

    //Form Submission Handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Please add title!');
            return;
        }

        onAddTask({ title, priority, status });
        setTitle('');
        setPriority('medium');
        setStatus('pending');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <button type="submit">Add Task</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};