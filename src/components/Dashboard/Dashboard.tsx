import React, { useState, useEffect } from 'react';
import type { Task, TaskStatus, TaskPriority } from '../../types';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskFilter } from '../TaskFilter/TaskFilter';
import { TaskList } from '../TaskList/TaskList';

export const Dashboard: React.FC = () => {
    console.log('Rendering Dashboard');

    // Load initial tasks from localStorage or start with empty array
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            try {
                return JSON.parse(saved) as Task[];
            } catch {
                return [];
            }
        }
        return [];
    });

    const [filter, setFilter] = useState<{ status?: TaskStatus; priority?: TaskPriority }>({});

    // Save tasks to localStorage whenever tasks state changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Add a new task
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

    // Delete task by id
    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    // Update filter state
    const handleFilterChange = (filters: { status?: TaskStatus; priority?: TaskPriority }) => {
        setFilter(filters);
    };

    // Filter tasks according to status and priority filter
    const filteredTasks = tasks.filter((task) => {
        const statusMatches = filter.status ? task.status === filter.status : true;
        const priorityMatches = filter.priority ? task.priority === filter.priority : true;
        return statusMatches && priorityMatches;
    });

    // Export tasks to JSON file
    const exportTasks = () => {
        const dataStr = JSON.stringify(tasks, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'tasks_backup.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    // Import tasks from JSON file
    const importTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = e.target?.result;
                if (typeof json === 'string') {
                    const importedTasks: Task[] = JSON.parse(json);
                    if (Array.isArray(importedTasks)) {
                        setTasks(importedTasks);
                    } else {
                        alert('Invalid tasks file');
                    }
                }
            } catch {
                alert('Failed to load tasks: Invalid JSON');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <h1>Task Dashboard</h1>
            <TaskForm onAddTask={addTask} />
            <TaskFilter onFilterChange={handleFilterChange} />
            <TaskList tasks={filteredTasks} onDelete={deleteTask} />

            {/* Export & Import Controls */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={exportTasks}>Export Tasks</button>
                <input
                    type="file"
                    accept="application/json"
                    onChange={importTasks}
                    style={{ marginLeft: '10px' }}
                />
            </div>
        </div>
    );
};
