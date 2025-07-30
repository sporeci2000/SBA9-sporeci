import React, { useState, useEffect } from 'react';
import type { Task, TaskStatus, TaskPriority } from '../../types';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskFilter } from '../TaskFilter/TaskFilter';
import { TaskList } from '../TaskList/TaskList';

const STORAGE_KEY = 'task_dashboard_tasks';

export const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<{ status?: TaskStatus; priority?: TaskPriority }>({});
    const [searchTerm, setSearchTerm] = useState('');

    // Load tasks from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setTasks(JSON.parse(stored));
        }
    }, []);

    // Save tasks to localStorage on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (data: {
        title: string;
        priority: TaskPriority;
        status: TaskStatus;
        description: string;
        dueDate: string;
    }) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: data.title,
            priority: data.priority,
            status: data.status,
            description: data.description,
            dueDate: data.dueDate,
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const handleFilterChange = (filters: { status?: TaskStatus; priority?: TaskPriority }) => {
        setFilter(filters);
    };

    // Filter by status, priority, AND search term
    const filteredTasks = tasks.filter((task) => {
        const statusMatches = filter.status ? task.status === filter.status : true;
        const priorityMatches = filter.priority ? task.priority === filter.priority : true;
        const searchMatches = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        return statusMatches && priorityMatches && searchMatches;
    });

    return (
        <div>
            <h1>Task Dashboard</h1>

            <TaskForm onAddTask={addTask} />

            <TaskFilter onFilterChange={handleFilterChange} />

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginTop: '1rem', marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
            />

            <TaskList tasks={filteredTasks} onDelete={deleteTask} />
        </div>
    );
};
