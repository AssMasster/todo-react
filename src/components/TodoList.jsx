import TodoItem from "./TodoItem"
import { memo } from "react"
const TodoList = (props) => {
    const {
        tasks = [],
        onDeleteTask,
        onToggleTaskComplete,
        filtredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    } = props
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
                ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
                onDeleteTask={onDeleteTask}
                onToggleTaskComplete={onToggleTaskComplete}
                className='todo__item'
                key={task.id}
                {...task}
            />
        ))}
      </ul>
    )
}

export default memo(TodoList)