import { createContext, useMemo } from "react";
import useTasks from "./useTasks";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const {children} = props
    const {            
        tasks,
        filtredTasks,
        deleteAllTasks,
        deleteTask,
        toggleTaskComplete,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId
    } = useTasks()

    const {
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
    } = useIncompleteTaskScroll(tasks)

    const value = useMemo(() => ({
        tasks,
        filtredTasks,
        deleteAllTasks,
        deleteTask,
        toggleTaskComplete,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
    }), [
            tasks,
            filtredTasks,
            deleteAllTasks,
            deleteTask,
            toggleTaskComplete,
            searchQuery,
            setSearchQuery,
            newTaskInputRef,
            addTask,
            disappearingTaskId,
            firstIncompleteTaskId,
            firstIncompleteTaskRef,
    ])

    return (
         <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}