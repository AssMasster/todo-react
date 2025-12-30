import TodoItem from "./TodoItem"
const TodoList = (props) => {
    const {
        tasks = [],
        onDeleteTask,
        onToggleTaskComplete,
    } = props
    const hasTasks = true

    if (!hasTasks) {
        return <div className="todo__empty-message"></div>
    }

    return (
      <ul className="todo__list">
        {tasks.map((task) => (
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