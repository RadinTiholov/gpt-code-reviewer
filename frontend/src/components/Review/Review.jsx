import classNames from 'classnames/bind';
import reviewStyles from './Review.module.css';
import scoreStyles from '../Score/Score.module.css';
import { Tab } from '../Tab/Tab';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as reviewService from '../../dataServices/reviewService'
import { useState } from 'react';
import { Score } from '../Score/Score';

let cx = classNames.bind(reviewStyles);
let cxs = classNames.bind(scoreStyles);

export const Review = () => {

    const [code, setCode] = useState('');
    const [analyzerNameInput, setAnalyzerNameInput] = useState('');
    const [tabs, setTabs] = useState([]);
    const [scores, setScores] = useState([]);
    const [isReviewed, setIsReviewed] = useState(false);
    const [isNewFilePage, setIsNewFilePage] = useState(true);
    const [errors, setErrors] = useState({
        inputError: false,
        reviewError: false
    });

    const addNewScoreButton = (e) => {
        e.preventDefault();

        if (!analyzerNameInput) {
            setErrors((prevState) => ({
                ...prevState,
                inputError: true
            }));
            return;
        }

        setScores((prevScores) => [
            ...prevScores,
            { name: analyzerNameInput, score: 0.0 }
        ]);

        setErrors((prevState) => ({
            inputError: false,
            reviewError: false
        }));

        setAnalyzerNameInput('');
    };


    const closeScore = (index) => {
        setScores((prevScores) => {
            const newScores = prevScores.slice(); // Make a copy of the scores array
            newScores.splice(index, 1); // Remove the score at the specified index
            return newScores;
        });
    };


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

        if (scores.length === 0) {
            setErrors((prevState) => ({
                ...prevState,
                reviewError: true
            }));
            return;
        }

        reviewService
            .reviewCode({ code })
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
                    </> :
                    <button onClick={onReview} className={cx('analyze-button')}>Analyze code</button>
                }
                {errors.reviewError && <p className={cx('analyze-button-error-message')}>Please add the aspects upon which the review will be based.</p>}

                {scores?.map((x, index) => (
                    <Score
                        key={index}
                        id={index}
                        name={x.name}
                        score={x.score}
                        closeScore={closeScore}
                    />
                ))}
                <div className={cxs('score-form')}>
                    <div className={cxs('score-heading-container')}>
                        <form id='newScoreForm'>
                            <p className={cxs('score-form-label')}>Enter a new analyzer: </p>
                            <input
                                className={cxs('score-form-input')}
                                type="text"
                                placeholder='Security'
                                name='analyzer'
                                id='analyzer'
                                value={analyzerNameInput}
                                onChange={(e) => setAnalyzerNameInput(e.target.value)}
                            />
                            {errors.inputError && <p className={cxs('score-form-error-message')}>Required!</p>}
                        </form>
                    </div>
                    <button form="newScoreForm" onClick={addNewScoreButton} className={cxs('score-form-button')}>
                        <i className={cxs('score-icon', 'fa-solid', 'fa-plus')}></i>
                    </button>
                </div>
            </div>
        </section>
    )
}