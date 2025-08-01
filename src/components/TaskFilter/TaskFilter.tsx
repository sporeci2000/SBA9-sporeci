import React, { useState } from 'react';
import type { TaskFilter as TaskFilterProps, TaskStatus, TaskPriority } from '../../types';

// Declares a React Functional Component and it takes onFilterChange as a prop
export const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
    console.log('Rendering TaskFilter');
    
    const [status, setStatus] = useState<TaskStatus | ''>(''); //stores currently selected status filte
    const [priority, setPriority] = useState<TaskPriority | ''>(''); //stores currently selected priority filter


    //Status change handler
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as TaskStatus | '';
        setStatus(value);
        onFilterChange({ status: value || undefined, priority: priority || undefined });
    };


    //Priority change handler
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as TaskPriority | '';
        setPriority(value);
        onFilterChange({ status: status || undefined, priority: value || undefined });
    };

    return (
        <div className="task-filter">
            <label>
                Status:
                <select value={status} onChange={handleStatusChange}>
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </label>

            <label>
                Priority:
                <select value={priority} onChange={handlePriorityChange}>
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>
        </div>
    );
};
