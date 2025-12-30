import Field from "./Field"
const SearchTaskForm = (props) => {
    const {
        searchQuery,
        setSearchQuery,
    } = props
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