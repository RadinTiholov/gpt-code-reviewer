import classNames from 'classnames/bind';
import styles from './Review.module.css';
import { Tab } from '../Tab/Tab';
import { Link } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as reviewService from '../../dataServices/reviewService' 
import { useEffect, useState } from 'react';

let cx = classNames.bind(styles);

export const Review = () => {

    const [code, setCode] = useState('');
    const [tabs, setTabs] = useState([]);
    const [isNewFilePage, setIsNewFilePage] = useState(true);
    const [isReviewed, setIsReviewed] = useState(false);

    const newButtonOnClick = () => {
        setIsNewFilePage(true);
    }

    const tabOnClick = (id, newCode) => {
        setCode(newCode);

        setTabs((prevTabs) => {
            // Set the selected tab's isOpen to true
            const updatedTabs = prevTabs.map((tab, index) => ({
                ...tab,
                isOpen: index === id,
            }));
            return updatedTabs;
        });
    }

    const closeTab = (id) => {
        setTabs((prevTabs) => {
            // Filter out the tab with the specified id
            const updatedTabs = prevTabs.filter((tab, index) => index !== id);

            // Set the code state to empty if there are no more tabs
            if (updatedTabs.length === 0) {
                setCode('');
                setIsNewFilePage(true);
            } else {
                // Check if there is an item before the deleted one
                if (id === tabs.findIndex((tab) => tab.isOpen)) {
                    // If the closed tab was the active tab, set the active tab to the previous one
                    const newActiveIndex = id - 1 >= 0 ? id - 1 : id + 1;
                    setCode(updatedTabs[newActiveIndex].value);

                    // Set the new active tab
                    const updatedTabsWithActive = updatedTabs.map((tab, index) => ({
                        ...tab,
                        isOpen: index === newActiveIndex,
                    }));
                    setTabs(updatedTabsWithActive);
                } else if (id < tabs.findIndex((tab) => tab.isOpen)) {
                    // If the closed tab was before the active tab, update the active tab accordingly
                    const newActiveIndex = tabs.findIndex((tab) => tab.isOpen) - 1;
                    const updatedTabsWithActive = updatedTabs.map((tab, index) => ({
                        ...tab,
                        isOpen: index === newActiveIndex,
                    }));
                    setTabs(updatedTabsWithActive);
                }
            }

            return updatedTabs;
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                // FileReader's onload event is triggered when the file is fully loaded
                const newCode = e.target.result;

                // Close the new file page
                setIsNewFilePage(false);

                // Add the new tab
                const newTab = { name: file.name, isOpen: true, value: newCode };
                setTabs((prevTabs) => {
                    // Set every other tab's isOpen to false
                    const updatedTabs = prevTabs.map((tab) => ({ ...tab, isOpen: false }));
                    // Add the new tab to the updatedTabs array
                    return [...updatedTabs, newTab];
                });

                // Set the code state with the loaded data
                setCode(newCode);
            };

            reader.readAsText(file);
        }
    };

    const onReview = (e) => {
        e.preventDefault();

        reviewService
            .reviewCode({code})
            .then(res => {
                setIsReviewed(true)
                // TODO: Set results
            })
            .catch(res => {
                // TODO
            })
    }

    return (
        <section className={cx('review-section')}>
            <div className={cx('tabs-section')}>
                {tabs?.map((x, index) => (
                    <Tab
                        key={index}
                        id={index}
                        name={x.name}
                        value={x.value}
                        isOpen={x.isOpen}
                        tabOnClick={tabOnClick}
                        closeTab={closeTab}
                    />
                ))}
                <div className={cx('new-tab')} onClick={newButtonOnClick}>
                    <i className={cx('new-tab-icon', 'fa-solid', 'fa-plus')}></i>
                </div>
            </div>
            <div className={cx('main-review-section')}>
                {isNewFilePage
                    ? <div className={cx('file-upload-wrapper')}>
                        <input className={cx('file-upload')} type="file" title=" " onChange={handleFileChange} />
                    </div>
                    : <div className={cx('code-visualizer-wrapper')}>
                        <SyntaxHighlighter
                            className={cx('code-visualizer')}
                            language="c"
                            showLineNumbers={true}
                            style={vs}
                        >
                            {code}
                        </SyntaxHighlighter>
                    </div>}
            </div>
            <div className={cx('scores-section')}>
                {isReviewed ?
                    <>
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
                    </> :
                    <button onClick={onReview} className={cx('analyze-button')}>Analyze code</button>
                }
            </div>
        </section>
    )
}