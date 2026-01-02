import {useEffect, useState, useCallback, useMemo, useRef} from 'react'
import useTasksLocalStorage from './useTasksLocalStorage'
const useTasks = () => {
    const {
        savedTasks,
        saveTasks,
    } = useTasksLocalStorage()
    const [tasks, setTasks] = useState(savedTasks ??  [
                        {id:'task-1', title:'Task 1', isDone: true},
                        {id: 'task-2', title:'Task 2', isDone: false}
                    ])
        
    
        const [newTaskTitle, setNewTaskTitle] = useState('')
    
        const [searchQuery, setSearchQuery] = useState('')
    
        const newTaskInputRef = useRef(null)
    
        const deleteAllTasks = useCallback(() => {
            const isConfirmed = confirm('Are you sure you want to delete all the issues?')
            if (isConfirmed) {
                setTasks([])
            }
        }, [])
    
        const deleteTask = useCallback((taskId) => {
            setTasks(tasks.filter(({id}) => id !== taskId))
        }, [tasks])
    
        const toggleTaskComplete = useCallback((taskId, isDone) => {
            setTasks(tasks.map((task) => {
                if (task.id === taskId) {
                    return {...task, isDone}
                }
                return task
            }))
        }, [tasks])
    
        const addTask = useCallback((title) => {
                const newTask ={
                    id: crypto?.randomUUID() ?? Date.now().toString(),
                    title,
                    isDone: false,
                }
                setTasks((prevTasks) => [...prevTasks, newTask])
                setNewTaskTitle('')
                setSearchQuery('')
                newTaskInputRef.current.focus()
        }, [])
    
        useEffect(() => {
            saveTasks(tasks)
        }, [tasks])
    
        useEffect(() => {
            newTaskInputRef.current.focus()
        }, [])
    
        const filtredTasks = useMemo(() => { 
            const clearSearchQuery = searchQuery.trim().toLowerCase()
            return clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null
        }, [searchQuery, tasks])
        return (
            {
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
            }
        )
}

export default useTasks