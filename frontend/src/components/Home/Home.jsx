import { Link } from "react-router-dom"
import classNames from 'classnames/bind';
import styles from './Home.module.css';
import logo from '../../images/logo-small-light.png';

let cx = classNames.bind(styles);

export const Home = () => {
    return (
        <section className={cx('home-section')}>
            <img className={cx('home-logo')} src={logo} alt='The logo of the web application' />
            <ul className={cx('home-link-list')}>
                <li>
                    <Link to="/login" className={cx('home-link')}>Login</Link>
                </li>
                <li>
                    <Link to="/register" className={cx('home-link')}>Regsiter</Link>
                </li>
            </ul>
        </section>
    )
}