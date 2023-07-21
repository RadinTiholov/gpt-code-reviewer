export const Login = () => {

    const login = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={login}>
            <input type="text" placeholder="Username" /><br />
            <input type="password" /><br />
            <button type="submit">Login</button>
        </form>
    )
}