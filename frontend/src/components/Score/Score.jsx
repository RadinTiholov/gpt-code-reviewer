import classNames from 'classnames/bind';
import styles from './Score.module.css';
import { useState } from 'react';

let cx = classNames.bind(styles);

export const Score = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const detailsClick = () => setIsOpen(state => !state)

    console.log(props);
    return (
        <div className={cx('score')}>
            <div className={cx('score-heading-container')}>
                <p className={cx('score-lable')}>{props.name} score:</p>
                <p className={cx('score-text')}>{Number(props.score).toFixed(1)}</p>
                {isOpen && <p className={cx('score-details', 'score-details-view')}>{props.scoreMessage ? props.scoreMessage: 'Review your code first to see details.'}</p>}
            </div>
            <div className={cx('score-buttons-container')}>
                <button onClick={() => props.closeScore(props.id)} className={cx('score-button-close')}>
                    <i className={cx('close-icon', 'fa-solid', 'fa-xmark')}></i>
                </button>

                <button onClick={detailsClick} className={cx('score-button')}>
                    <i className={cx('score-icon', 'fa-solid', 'fa-play', isOpen ? 'score-icon--open' : '')}></i>
                </button>
            </div>
        </div>
    )
}