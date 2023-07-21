import { useState } from "react";
import * as identityService from "../../dataServices/identityService";
import { useNavigate } from "react-router-dom";

export const Register = () => {

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

    const register = (e) => {
        e.preventDefault();

        identityService.register(inputData)
            .then(res => {
                navigate('/login')
            })
            .catch(res => {
                setError({ active: true, message: res.message })
            })
    }

    return (
        <form onSubmit={register}>
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={inputData.username}
                onChange={onChange}
            />
            <br />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={inputData.email}
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
            <button type="submit">Register</button>
        </form>
    )
}