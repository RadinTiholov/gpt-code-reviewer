import { useState } from "react";
import * as identityService from "../../dataServices/identityService";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        active: false, message: ""
    });

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const login = (e) => {
        e.preventDefault();

        identityService.login(inputData)
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(res => {
                setError({ active: true, message: res.message })
            })
    }

    return (
        <form onSubmit={login}>
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={inputData.username}
                onChange={onChange}
            />
            <br />
            <input
                type="password"
                name="password"
                value={inputData.password}
                onChange={onChange}
            />
            <br />
            {error?.active ? 
            <p>
                Error!
            </p>
            : <></>}
            <button type="submit">Login</button>
        </form>
    )
}