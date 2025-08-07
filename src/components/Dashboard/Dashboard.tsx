import React, { useState, useEffect, useRef } from 'react';
import type { Task, TaskStatus, TaskPriority } from '../../types';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskFilter } from '../TaskFilter/TaskFilter';
import { TaskList } from '../TaskList/TaskList';
import './Dashboard.css';

//constant for localStorage key
const STORAGE_KEY = 'taskManagerTasks';

//State Initialization
export const Dashboard: React.FC = () => {
    //Store and update the list of tasks
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    const [filter, setFilter] = useState<{ status?: TaskStatus; priority?: TaskPriority }>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'status' | ''>('');
    const fileInputRef = useRef<HTMLInputElement>(null); //Hidden file input for importing tasks


    //Every time tasks changes save them to localStorage
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

    const filteredTasks = tasks.filter((task) => {
        const statusMatches = filter.status ? task.status === filter.status : true;
        const priorityMatches = filter.priority ? task.priority === filter.priority : true;
        const searchMatches =
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase());
        return statusMatches && priorityMatches && searchMatches;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (!sortBy) return 0;
        if (sortBy === 'dueDate') {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        if (sortBy === 'priority') {
            const priorityOrder = { low: 1, medium: 2, high: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        if (sortBy === 'status') {
            const statusOrder = { pending: 1, 'in-progress': 2, completed: 3 };
            return statusOrder[a.status] - statusOrder[b.status];
        }
        return 0;
    });

    // Statistics calculation
    const totalTasks = filteredTasks.length;
    const completedTasks = filteredTasks.filter(t => t.status === 'completed').length;
    const pendingTasks = filteredTasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress').length;

    // Export tasks as JSON file
    // Saves tasks as downloadable
    const handleExport = () => {
        const dataStr = JSON.stringify(tasks, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tasks.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Import tasks from JSON file
    // Loads tasks from uploaded JSON file
    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedTasks = JSON.parse(event.target?.result as string);
                if (Array.isArray(importedTasks)) {
                    setTasks(importedTasks);
                } else {
                    alert('Invalid file format.');
                }
            } catch {
                alert('Error parsing JSON file.');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    return (
        <div>
            <h1>Task Dashboard</h1>
            <TaskForm onAddTask={addTask} />
            <TaskFilter onFilterChange={handleFilterChange} />

            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginTop: '1rem', padding: '0.5rem', width: '100%' }}
            />

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                style={{ marginTop: '1rem' }}
            >
                <option value="">Sort By</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
            </select>

            <div style={{ marginTop: '1rem' }}>
                <button onClick={handleExport}>Export Tasks</button>
                <button onClick={() => fileInputRef.current?.click()} style={{ marginLeft: '1rem' }}>
                    Import Tasks
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json"
                    style={{ display: 'none' }}
                    onChange={handleImport}
                />
            </div>

            {/* Task Statistics */}
            <div
                style={{
                    maxWidth: 600,
                    margin: '2rem auto',
                    padding: '1rem',
                    background: '#4e4e4eff',
                    borderRadius: 8,
                    fontSize: '1rem',
                }}
            >
                <h3>Task Statistics</h3>
                <p>Total Tasks: {totalTasks}</p>
                <p>Completed: {completedTasks}</p>
                <p>Pending: {pendingTasks}</p>
                <p>In Progress: {inProgressTasks}</p>
            </div>

            <TaskList tasks={sortedTasks} onDelete={deleteTask} onEdit={() => { }} />
        </div>
    );
};
