import { useContext } from "react"
import Field from "../Field/Field"
import { TasksContext } from "../../context/TasksContext"
const SearchTaskForm = (props) => {
    const { styles } = props
    const {
        searchQuery,
        setSearchQuery,
    } = useContext(TasksContext)
    return (
        <form className={styles.form}
            onSubmit={(event) => event.preventDefault()}
        >
            <Field 
                onInput={({target}) => {setSearchQuery(target.value)}}
                className={styles.field}
                id='search-task'
                type='search'
                label='Search task'
                value={searchQuery}

            />
        </form>
    )
}

export default SearchTaskForm