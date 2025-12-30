import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
import { useState } from "react"
const Todo = () => {
    const [tasks, setTasks] = useState([
        {id:'task-1', title:'Task 1', isDone: true},
        {id: 'task-2', title:'Task 2', isDone: false}
    ])

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const deleteAllTasks = () => {
        const isConfirmed = confirm('Are you sure you want to delete all the issues?')
        if (isConfirmed) {
            setTasks([])
        }
    }

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(({id}) => id !== taskId))
    }

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(tasks.map((task) => {
            if (task.id === taskId) {
                return {...task, isDone}
            }
            return task
        }))
    }

    const filterTasks = (query) => {
        console.log(`List by ${query}`)
    }

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask ={
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }
            setTasks([...tasks, newTask])
            setNewTaskTitle('')
        }

    }

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm 
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm 
                onSearchInputChange={filterTasks}
            />
            <TodoInfo onDeleteAllButtonClick={deleteAllTasks} total={tasks.length} done={tasks.filter((isDone) => isDone).length}/>
            <TodoList 
                onDeleteTask={deleteTask} 
                tasks={tasks}
                onToggleTaskComplete={toggleTaskComplete}
            />
        </div>
    )
}

export default Todo