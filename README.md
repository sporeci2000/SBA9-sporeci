The Task Management Dashboard is a simple and helpful web app built with React and TypeScript. It lets users keep track of their daily tasks in one place. You can add, edit, delete, search, and filter your tasks based on their status (like pending, in progress, or completed) and priority (low, medium, or high). You can also sort your tasks by due date, status, or priority to stay organized.
All the tasks are saved in the browser using localStorage, so they stay there even after you refresh the page. There’s also a search bar to quickly find tasks, and a statistics section that shows how many tasks are done, in progress, or still pending. You can also export your tasks to a JSON file (as a backup) or import tasks from a file.
The project is made with clean, reusable code using components and TypeScript types. It shows how to manage form inputs, handle user actions, and make the app easy to use and understand.

While working on this project, I faced a few challenges. One of the main difficulties was managing the different states in the app, especially when filtering, sorting, and searching tasks all at the same time. It took some time to figure out how to combine all these features in a way that worked smoothly together. I also struggled a bit with TypeScript types at first, especially when passing props between components. Understanding how to use interfaces correctly helped me solve those issues. Another challenge was saving and loading tasks using localStorage, especially when importing tasks from a file and making sure the data was valid. I had to write extra logic to handle errors and keep the app from crashing. Overall, these problems helped me learn more about debugging, organizing my code, and thinking through how components should communicate.

The Dashboard component:   
Stores the state of the entire task list   
Handles adding, deleting, filtering, sorting, and saving tasks   
Passes props down to child components  

The TaskForm component:   
Uses useState to manage form inputs   
Validates inputs before submitting   
Calls onAddTask()   

The TaskFilter component:   
Stores current filter values (status, priority)   
Calls onFilterChange() when filters change   
Helps users narrow down the task list   

The TaskList and TaskItem components:   
Take a list of tasks and render each one using .map()   
TaskItem handles delete/edit buttons for each task   


RESOURCES:
https://www.arvinpoddar.com/blog/syncing-local-storage-with-react-state?utm_source=chatgpt.com 
https://legacy.reactjs.org/docs/hooks-reference.html#useref 
https://react.dev/reference/react/useState 
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage 
https://developer.mozilla.org/en-US/docs/Web/API/FileReader 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/
https://react.dev/reference/react/useEffect  
https://developer.mozilla.org/en-US/docs/Web/API/FileReader 
https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static 
https://legacy.reactjs.org/docs/forms.html#handling-multiple-inputs 

