import classNames from 'classnames/bind';
import styles from './Score.module.css';
import { Link } from 'react-router-dom';

let cx = classNames.bind(styles);

export const Score = (props) => {
    return (
        <div className={cx('score')}>
            <div className={cx('score-heading-container')}>
                <p className={cx('score-lable')}>{props.name} score:</p>
                <p className={cx('score-text')}>{Number(props.score).toFixed(1)}</p>
            </div>
            <div className={cx('score-buttons-container')}>
                <button onClick={() => props.closeScore(props.id)} className={cx('score-button-close')}>
                    <i className={cx('close-icon', 'fa-solid', 'fa-xmark')}></i>
                </button>
                <Link to='/' className={cx('score-button')}>
                    <i className={cx('score-icon', 'fa-solid', 'fa-play')}></i>
                </Link>
            </div>
        </div>
    )
}