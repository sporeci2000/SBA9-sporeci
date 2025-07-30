//This creates specific allowed values for task status and priority 
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high'

//Task Interface
export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

//TaskFilter interface
export interface TaskFilter {
    onFilterChange: (filters: {
        status?: TaskStatus;
        priority?: 'low' | 'medium' | 'high';
    }) => void;
}
