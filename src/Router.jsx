import { useEffect, useState } from "react"

const matchPath = (path, route) => {
    const pathParts = path.split('/')
    const routePaths = route.split('/')

    if (pathParts.length !== routePaths.length) {
        return null
    }

    const params = {}

    for (let i = 0; i < routePaths.length; i++) {
        if (routePaths[i].startsWith(':')) {
            const paramName = routePaths[i].slice(1)
            params[paramName] = pathParts[i]
        } else if (routePaths[i] !== pathParts[i]) {
            return null
        }
    }

    return params
}

export const useRoute = () => {
    const [ path, setPath ] = useState(window.location.pathname)

    useEffect(() => {
        const onLocationState = () => {
            setPath(window.location.pathname)
        }

        window.addEventListener('popstate', onLocationState)

        return () => {
            window.removeEventListener('popstate', onLocationState)
        }
    }, [])

    return path
}

const Router = (props) => {
    const { routes } = props
    const path = useRoute()
    
    // Получаем ключи объекта routes (пути) и итерируемся по ним
    const routeKeys = Object.keys(routes)
    
    for (const route of routeKeys) {
        // Пропускаем wildcard маршрут '*'
        if (route === '*') continue
        
        const params = matchPath(path, route)

        if (params) {
            const Page = routes[route]
            return <Page params={params}/>
        }
    }

    // Проверяем точное совпадение (например, для пути '/')
    if (routes[path]) {
        const Page = routes[path]
        return <Page />
    }

    // Возвращаем 404 компонент
    const NotFound = routes['*'] || (() => <div>404 Page not found</div>)
    return <NotFound />
}

export default Router