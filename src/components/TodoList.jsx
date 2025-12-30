import TodoItem from "./TodoItem"
const TodoList = (props) => {
    const {
        tasks = [],
        onDeleteTask,
        onToggleTaskComplete,
        filtredTasks,
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

export default TodoList