import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-small-dark.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';

let cx = classNames.bind(styles);

export const Header = () => {

    const { user } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);

    const openHeader = () => {
        setIsOpen((state) => !state)
    }

    return (
        <header onClick={() => { return isOpen ? setIsOpen(false) : null }} className={cx('header', isOpen ? '' : 'header-closed')}>
            <ul className={cx('header-list')}>
                <li className={cx('header-heading')}>
                    <img onClick={openHeader} className={cx('header-logo')} src={logo} alt='The logo of the web application' />
                    <Link className={cx('header-heading-text')} to="/">gpt-code-reviewer</Link>
                </li>
                {user ?
                    <>
                        <li>
                            <i onClick={openHeader} className={cx('header-icon', 'fa-solid', 'fa-code')}></i>
                            <Link to="/review">Review</Link>
                        </li>
                        <li>
                            <i onClick={openHeader} className={cx('header-icon', 'fa-solid', 'fa-door-open')}></i>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <i onClick={openHeader} className={cx('header-icon', 'fa-solid', 'fa-play')}></i>
                            <Link to="/register">Start now</Link>
                        </li>
                        <li>
                            <i onClick={openHeader} className={cx('header-icon', 'fa-solid', 'fa-right-to-bracket')}></i>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <i onClick={openHeader} className={cx('header-icon', 'fa-solid', 'fa-home')}></i>
                            <Link to="/">Home</Link>
                        </li>
                    </>}
            </ul>
        </header>
    );
};
