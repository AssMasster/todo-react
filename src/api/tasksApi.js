const URL = 'http://localhost:3001/tasks'

const headers = {
    'Content-Type': 'application/json',
}

const tasksAPI = {
    getAll: () => {
        return  fetch(URL).then((responce) => responce.json())
    },

    getById: (id) => {
        return fetch(`${URL}/${id}`)
        .then((responce) => responce.json())
    },

    add: (task) => {
        return fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(task),
            })
            .then((responce) => responce.json())
    },

    delete: (id) => {
        return fetch(`${URL}/${id}`, {
                method: 'DELETE',
            })
    },

    deleteAll: (tasks) => {
        return Promise.all(
                    tasks.map(({id}) => {
                        tasksAPI.delete(id)
                        })
        )
    },

    toggleComplete: (id, isDone) => {
        return fetch(`${URL}/${id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({isDone})
            })
    },
}

export default tasksAPI