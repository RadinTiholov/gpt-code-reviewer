import classNames from 'classnames/bind';
import styles from './Review.module.css';
import { Tab } from '../Tab/Tab';

let cx = classNames.bind(styles);

export const Review = () => {
    return (
        <section className={cx('review-section')}>
            <div className={cx('tabs-section')}>
                <Tab name="Example.js"/>
                <Tab name="App.js"/>
                <Tab name="Requester.cs" isOpen={true}/>
                <Tab name="Requester.js"/>
            </div>
            <div className={cx('main-review-section')}></div>
            <div className={cx('scores-section')}></div>
        </section>
    )
}