import { useContext } from "react"
import Field from "./Field"
import { TasksContext } from "../context/TasksContext"
const SearchTaskForm = () => {
    const {
        searchQuery,
        setSearchQuery,
    } = useContext(TasksContext)
    return (
        <form className="todo__form"
            onSubmit={(event) => event.preventDefault()}
        >
            <Field 
                onInput={({target}) => {setSearchQuery(target.value)}}
                className='todo__field'
                id='search-task'
                type='search'
                label='Search task'
                value={searchQuery}

            />
        </form>
    )
}

export default SearchTaskForm