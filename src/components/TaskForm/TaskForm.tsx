import React, { useState, useEffect } from 'react';
import type { TaskPriority, TaskStatus, Task } from '../../types';

interface TaskFormProps {
    onAddTask: (task: {
        id?: string;
        title: string;
        priority: TaskPriority;
        status: TaskStatus;
        description: string;
        dueDate: string;
    }) => void;
    taskToEdit?: Task | null;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('medium');
    const [status, setStatus] = useState<TaskStatus>('pending');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setPriority(taskToEdit.priority);
            setStatus(taskToEdit.status);
            setDescription(taskToEdit.description);
            setDueDate(taskToEdit.dueDate);
            setError('');
        } else {
            setTitle('');
            setPriority('medium');
            setStatus('pending');
            setDescription('');
            setDueDate('');
            setError('');
        }
    }, [taskToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        onAddTask({
            id: taskToEdit?.id,
            title,
            priority,
            status,
            description,
            dueDate,
        });

        if (!taskToEdit) {
            setTitle('');
            setPriority('medium');
            setStatus('pending');
            setDescription('');
            setDueDate('');
        }
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
            <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
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
            <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};
