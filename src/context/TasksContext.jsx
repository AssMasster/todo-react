import { createContext } from "react";
import useTasks from "../hooks/useTasks";
import useIncompleteTaskScroll from "../hooks/useIncompleteTaskScroll";

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const {children} = props
    const {            
        tasks,
        filtredTasks,
        deleteAllTasks,
        deleteTask,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask
    } = useTasks()

    const {
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
    } = useIncompleteTaskScroll(tasks)

    return (
         <TasksContext.Provider
            value={
            {
                tasks,
                filtredTasks,
                firstIncompleteTaskRef,
                firstIncompleteTaskId,
                deleteAllTasks,
                deleteTask,
                toggleTaskComplete,
                newTaskTitle,
                setNewTaskTitle,
                searchQuery,
                setSearchQuery,
                newTaskInputRef,
                addTask
            }
            }
        >
            {children}
        </TasksContext.Provider>
    )
}