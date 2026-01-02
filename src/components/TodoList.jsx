import TodoItem from "./TodoItem"
import { memo, useContext } from "react"
import { TasksContext } from "../context/TasksContext"
const TodoList = () => {
    const {
        tasks,
        filtredTasks,
    } = useContext(TasksContext)
    const hasTasks = tasks.length > 0
    const isEmptyFilteredTasks = filtredTasks?.length === 0

    if (!hasTasks) {
        return <div className="todo__empty-message">There are no tasks yet</div>
    }

    if (hasTasks && isEmptyFilteredTasks) {
        return <div className="todo__empty-message">Task not found</div>
    }

    return (
      <ul className="todo__list">
        {(filtredTasks ?? tasks).map((task) => (
            <TodoItem
                className='todo__item'
                key={task.id}
                {...task}
            />
        ))}
      </ul>
    )
}

export default memo(TodoList)