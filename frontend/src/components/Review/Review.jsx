import classNames from 'classnames/bind';
import styles from './Review.module.css';
import { Tab } from '../Tab/Tab';
import { Link } from 'react-router-dom';

let cx = classNames.bind(styles);

export const Review = () => {
    return (
        <section className={cx('review-section')}>
            <div className={cx('tabs-section')}>
                <Tab name="Example.js" />
                <Tab name="App.js" />
                <Tab name="Requester.cs" isOpen={true} />
                <Tab name="Requester.js" />
            </div>
            <div className={cx('main-review-section')}></div>
            <div className={cx('scores-section')}>
                <div className={cx('overall-score', 'overall-score--excellent')}>
                    <div className={cx('overall-score-heading-container')}>
                        <p className={cx('overall-score-lable')}>Overall score: </p>
                        <p className={cx('overall-score-text')}>8.3</p>
                    </div>
                    <p className={cx('overall-score-message')}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div className={cx('score')}>
                    <div className={cx('score-heading-container')}>
                        <p className={cx('score-lable')}>Bugs score:</p>
                        <p className={cx('score-text')}>9.0</p>
                    </div>
                    <Link to='/' className={cx('score-button')}>
                        <i className={cx('score-icon', 'fa-solid', 'fa-play')}></i>
                    </Link>
                </div>
                <div className={cx('score')}>
                    <div className={cx('score-heading-container')}>
                        <p className={cx('score-lable')}>Quality score:</p>
                        <p className={cx('score-text')}>7.5</p>
                    </div>
                    <Link to='/' className={cx('score-button')}>
                        <i className={cx('score-icon', 'fa-solid', 'fa-play')}></i>
                    </Link>
                </div>
                <div className={cx('score')}>
                    <div className={cx('score-heading-container')}>
                        <p className={cx('score-lable')}>Refactoring score:</p>
                        <p className={cx('score-text')}>8.0</p>
                    </div>
                    <Link to='/' className={cx('score-button')}>
                        <i className={cx('score-icon', 'fa-solid', 'fa-play')}></i>
                    </Link>
                </div>
                <div className={cx('score-form')}>
                    <div className={cx('score-heading-container')}>
                        <form>
                            <p className={cx('score-form-label')}>Enter a new analyzer: </p>
                            <input 
                                className={cx('score-form-input')}
                                type="text" 
                                placeholder='Security'
                                name='analyzer'
                                id='analyzer'
                            />    
                        </form>
                    </div>
                    <Link to='/' className={cx('score-form-button')}>
                        <i className={cx('score-icon', 'fa-solid', 'fa-plus')}></i>
                    </Link>
                </div>
            </div>
        </section>
    )
}