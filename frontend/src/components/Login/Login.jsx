import { useState } from "react";
import * as identityService from "../../dataServices/identityService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../actions/authActions"

export const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);

    const [inputData, setInputData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const login = (e) => {
        e.preventDefault();

        identityService.login(inputData)
            .then(res => {

                // Save user state to Redux store
                dispatch(loginSuccess(res));

                navigate('/')
            })
            .catch(res => {
                // Save error state to Redux store
                dispatch(loginFailure(res.message));
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
            {error ?
                <p>
                    Error!
                </p>
                : <></>}
            <button type="submit">Login</button>
        </form>
    )
}