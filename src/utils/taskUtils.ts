import type { Task, TaskStatus, TaskPriority } from '../types';

export function filterTasks(
    tasks: Task[],
    status?: TaskStatus,
    priority?: TaskPriority,
    searchTerm?: string
): Task[] {
    return tasks.filter(task => {
        const statusMatches = status ? task.status === status : true;
        const priorityMatches = priority ? task.priority === priority : true;
        const searchMatches = searchTerm
            ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        return statusMatches && priorityMatches && searchMatches;
    });
}
