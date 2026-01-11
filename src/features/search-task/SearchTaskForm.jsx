import { useContext } from "react"
import Field from "../../shared/ui/Field"
import { TasksContext } from "../../entites/todo"
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