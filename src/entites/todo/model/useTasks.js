import {useEffect, useState, useCallback, useMemo, useRef, useReducer} from 'react'
import tasksAPI from '@/shared/api/tasks'

const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALL': {
            return Array.isArray(action.tasks) ? action.tasks : state
        }
        case 'ADD': {
            return [...state, action.task]
        }
        case 'DELETE': {
            return state.filter((task) => {
                return task.id !== action.id
            })
        }
        case 'TOGGLE_COMPLETE': {
            const { id, isDone } = action
            return state.map((task) => {
                return task.id === id ? {...task, isDone} : task
            })
        }
        case 'DELETE_ALL': {
            return []
        }
        default: {
            return state
        }

    }
}

const useTasks = () => {

    const [tasks, dispatch] = useReducer(tasksReducer, [])
        
    
        const [newTaskTitle, setNewTaskTitle] = useState('')
    
        const [searchQuery, setSearchQuery] = useState('')

        const [disappearingTaskId, setDisappearingTaskId] = useState(null)
    
        const newTaskInputRef = useRef(null)
    
        const deleteAllTasks = useCallback(() => {
            const isConfirmed = confirm('Are you sure you want to delete all the issues?')
            if (isConfirmed) {
                tasksAPI.deleteAll(tasks)
                .then(() => dispatch({type: 'DELETE_ALL'}))
            }
        }, [tasks])
    
        const deleteTask = useCallback((taskId) => {
            tasksAPI.delete(taskId)
            .then(() => {
                setDisappearingTaskId(taskId)
                setTimeout(() => {
                    dispatch({type: 'DELETE', id: taskId})
                    console.log(tasks)
                    setDisappearingTaskId(null)
                }, 400)
            })
        }, [])
    
        const toggleTaskComplete = useCallback((taskId, isDone) => {
            tasksAPI.toggleComplete(taskId, isDone)
            .then(() => {
                dispatch({type: 'TOGGLE_COMPLETE', id: taskId, isDone})
                })
        }, [])
    
        const addTask = useCallback((title) => {
                const newTask ={
                    title,
                    isDone: false,
                }
                tasksAPI.add(newTask).then((addedTask) => {
                    dispatch({type: 'ADD', task: addedTask})
                    setNewTaskTitle('')
                    setSearchQuery('')
                    newTaskInputRef.current.focus()
                })
        }, [])

        useEffect(() => {
            tasksAPI.getAll().then((serverTasks) => dispatch({type: 'SET_ALL', tasks: serverTasks}))
        }, [])
    
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
                addTask,
                disappearingTaskId
            }
        )
}

export default useTasks