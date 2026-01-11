import AddTaskForm from "../../features/add-task"
import Button from "../../shared/ui/Button"
import SearchTaskForm from "../../features/search-task"
import TodoInfo from "../../features/stats"
import  TodoList  from "../../entites/todo/ui/TodoList"
import { TasksContext } from "../../entites/todo"
import { useContext } from "react"
import styles from './Todo.module.scss'
const Todo = () => {
    const {firstIncompleteTaskRef} = useContext(TasksContext)
    return (
            <div className={styles.todo}>
                <h1 className={styles.title}>To Do List</h1>
                <AddTaskForm styles={styles}/>
                <SearchTaskForm styles={styles} />
                <TodoInfo 
                    styles={styles}
                />
                <Button 
                    onClick={() => {
                        firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})
                }}>
                    Show first incomplete task
                </Button>
                <TodoList 
                    styles={styles}
                />
            </div>
    )
}

export default Todo