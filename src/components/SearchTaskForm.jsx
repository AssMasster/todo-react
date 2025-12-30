import Field from "./Field"
const SearchTaskForm = (props) => {
    const {
        onSearchInputChange,
    } = props
    return (
        <form className="todo__form"
            onSubmit={(event) => event.preventDefault()}
        >
            <Field 
                onInput={({target}) => {onSearchInputChange(target.value)}}
                className='todo__field'
                id='search-task'
                type='search'
                label='Search task'
            />
        </form>
    )
}

export default SearchTaskForm