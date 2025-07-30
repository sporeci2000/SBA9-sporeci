import React, { useState } from 'react';
import type { Task, TaskStatus, TaskPriority } from '../../types';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskFilter } from '../TaskFilter/TaskFilter';

export const Dashboard: React.FC = () => {

    console.log('Rendering Dashboard');
    
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<{ status?: TaskStatus; priority?: TaskPriority }>({});

    const addTask = (data: { title: string; priority: TaskPriority; status: TaskStatus }) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: data.title,
            priority: data.priority,
            status: data.status,
            description: '',
            dueDate: '',
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const handleFilterChange = (filters: { status?: TaskStatus; priority?: TaskPriority }) => {
        setFilter(filters);
    };

    const filteredTasks = tasks.filter((task) => {
        const statusMatches = filter.status ? task.status === filter.status : true;
        const priorityMatches = filter.priority ? task.priority === filter.priority : true;
        return statusMatches && priorityMatches;
    });

    return (
        <div>
            <h1>Task Dashboard</h1>
            <TaskForm onAddTask={addTask} />
            <TaskFilter onFilterChange={handleFilterChange} />

            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> — {task.status} — {task.priority}
                    </li>
                ))}
            </ul>
        </div>
    );
};
