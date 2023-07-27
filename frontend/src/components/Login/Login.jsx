import { useState } from "react";
import * as identityService from "../../dataServices/identityService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../actions/authActions"
import classNames from 'classnames/bind';
import styles from './Login.module.css';
import meme from '../../images/meme-login.png';

let cx = classNames.bind(styles);

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
        <section className={cx('login-section')}>
            <div>
                <img className={cx('login-img')} src={meme} alt="Meme for the cover of the login page" />
            </div>
            <form className={cx('form', 'form--login')} onSubmit={login}>
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
                    placeholder="Password"
                    value={inputData.password}
                    onChange={onChange}
                />
                <br />
                {error?.active ?
                    <p>
                        Error!
                    </p>
                    : <></>}
                <button className={cx('btn', 'btn--large')} type="submit">Login</button>
            </form>
        </section>
    )
}