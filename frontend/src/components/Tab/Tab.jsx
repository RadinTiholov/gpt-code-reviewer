import classNames from 'classnames/bind';
import styles from './Tab.module.css';

let cx = classNames.bind(styles);

export const Tab = (props) => {
    return (
        <div className={cx('tab', { 'tab--selected': props.isOpen })} onClick={() => props.tabOnClick(props.id, props.value)}>
            {props.name} <i className={cx('close-icon', 'fa-solid', 'fa-xmark')} onClick={() => props.closeTab(props.id)}></i>
        </div>
    );
}
