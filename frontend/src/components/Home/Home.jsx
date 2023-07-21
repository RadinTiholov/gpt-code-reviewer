import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <>
            <h1>Hello</h1>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Regsiter</Link></li>
            </ul>
        </>
    )
}