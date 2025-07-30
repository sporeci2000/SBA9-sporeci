import React, { useState, useEffect } from 'react';
import type { Task, TaskPriority, TaskStatus } from '../../types';

interface TaskFormProps {
    onAddTask: (task: Omit<Task, 'id'>) => void;
    onUpdateTask?: (task: Task) => void;
    editingTask?: Task | null;
    cancelEdit?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
    onAddTask,
    onUpdateTask,
    editingTask,
    cancelEdit,
}) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('medium');
    const [status, setStatus] = useState<TaskStatus>('pending');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    // When editingTask changes, update form fields
    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setPriority(editingTask.priority);
            setStatus(editingTask.status);
            setDescription(editingTask.description);
            setDueDate(editingTask.dueDate);
            setError('');
        } else {
            // Reset form if no task editing
            setTitle('');
            setPriority('medium');
            setStatus('pending');
            setDescription('');
            setDueDate('');
            setError('');
        }
    }, [editingTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        if (editingTask && onUpdateTask) {
            onUpdateTask({
                id: editingTask.id,
                title,
                priority,
                status,
                description,
                dueDate,
            });
        } else {
            onAddTask({ title, priority, status, description, dueDate });
        }

        if (!editingTask) {
            // Reset only if adding new task
            setTitle('');
            setPriority('medium');
            setStatus('pending');
            setDescription('');
            setDueDate('');
        }
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

            <button type="submit">{editingTask ? 'Save Task' : 'Add Task'}</button>
            {editingTask && cancelEdit && (
                <button type="button" onClick={cancelEdit} style={{ marginLeft: '10px' }}>
                    Cancel
                </button>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};
