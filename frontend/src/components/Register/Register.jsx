import classNames from 'classnames/bind';
import styles from './Register.module.css';
import { useState } from "react";
import * as identityService from "../../dataServices/identityService";
import { useNavigate } from "react-router-dom";

let cx = classNames.bind(styles);

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
        <section className={cx('register-section')}>
            <div className={cx('register-heading')}>
                <p className={cx('register-heading-fragment-1', 'register-heading-fragment')}>Review</p>
                <p className={cx('register-heading-fragment-2', 'register-heading-fragment')}>Your</p>
                <p className={cx('register-heading-fragment-3', 'register-heading-fragment')}>Code</p>
            </div>
            <form className={cx('form', 'form--register')} onSubmit={register}>
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
                <button className={cx('btn', 'btn--large')} type="submit">Register</button>
            </form>
        </section>
    )
}