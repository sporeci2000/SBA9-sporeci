import React, { useState } from 'react';
import type { Task, TaskFilter, TaskPriority, TaskStatus } from '../../types';
import { TaskForm } from '../TaskForm/TaskForm';

export const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<TaskFilter>({});

    const addTask = (data: { title: string; priority: TaskPriority; status: TaskStatus }) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: data.title,
            priority: data.priority,
            status: data.status,
            description: '',
            dueDate: ''
        };
        setTasks((prev) => [...prev, newTask]); //adds the new task to the end 
    };

    return (
        <div>
            <h1>Task Dashboard</h1>
            <TaskForm onAddTask={addTask} />
            
        </div>
    );
};