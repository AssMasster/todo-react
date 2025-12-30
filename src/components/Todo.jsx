import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
const Todo = () => {
    const tasks = [
        {id:'task-1', title:'Task 1', isDone: true},
        {id: 'task-2', title:'Task 2', isDone: false}
    ]

    const deleteAllTasks = () => {
        console.log('click')
    }

    const deleteTask = (taskId) => {
        console.log(`delete task by ${taskId}`)
    }

    const toggleTaskComplete = (taskId, isDone) => {
        console.log(`task ${taskId} ${isDone ? 'done' : 'in procces'}`)
    }

    const filterTasks = (query) => {
        console.log(`List by ${query}`)
    }

    const addTask = () => {
        console.log('add new task')
    }

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm 
                addTask={addTask}
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