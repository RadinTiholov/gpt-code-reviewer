import classNames from 'classnames/bind';
import reviewStyles from './Review.module.css';
import scoreStyles from '../Score/Score.module.css';
import { Tab } from '../Tab/Tab';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as reviewService from '../../dataServices/reviewService'
import { useState } from 'react';
import { Score } from '../Score/Score';
import logo from '../../images/logo-small-dark-alternative.png';

let cx = classNames.bind(reviewStyles);
let cxs = classNames.bind(scoreStyles);

export const Review = () => {

    const [code, setCode] = useState('');
    const [analyzerNameInput, setAnalyzerNameInput] = useState('');
    const [tabs, setTabs] = useState([]);
    const [scores, setScores] = useState([]);
    const [overallScore, setOverallScore] = useState({});
    const [isLoading, setIsLoading] = useState(false);
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

        setScores((prevScores) => {
            const scores = [
                ...prevScores,
                { name: analyzerNameInput, score: 0.0 }
            ]

            // Update the scores to the tab
            const currentOpenTab = tabs.find(tab => tab.isOpen);

            if (currentOpenTab) {
                // Update the isReview property of the current open tab
                const updatedTabs = tabs.map(tab => ({
                    ...tab,
                    scores: tab === currentOpenTab ? scores : tab.scores ? tab.scores : [],
                }));
                setTabs(updatedTabs);
            }

            return scores;
        });

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

        // Reset
        setScores([]);
        setIsReviewed(false);
    }

    const tabOnClick = (id, newCode) => {
        // Set stats of the selected tab
        setCode(newCode);
        setIsReviewed(tabs[id].isReview);
        setScores(tabs[id].scores);

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
                    const updatedTabs = prevTabs.map((tab) => ({ ...tab, isOpen: false, isReviewed: false, scores: [] }));
                    // Add the new tab to the updatedTabs array
                    return [...updatedTabs, newTab];
                });

                // Set the code state with the loaded data
                setCode(newCode);

                // Set that it isn't reviewed yet
                setIsReviewed(false);
                setScores([]);
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

        setIsLoading(true);

        const factors = scores.map(x => x.name);

        reviewService
            .reviewCode({ code, factors })
            .then(res => {
                setIsReviewed(true);

                setScores((state) => {
                    factors.forEach((factorName) => {
                        if (res.hasOwnProperty(factorName + 'Score')) {
                            const indexToChange = state.findIndex((x) => x.name === factorName);

                            if (indexToChange !== -1) {
                                state[indexToChange].score = res[factorName + 'Score'];
                                state[indexToChange].scoreMessage = res[factorName + 'ScoreMessage'];
                            }
                        }
                    });

                    return [...state];
                });

                setOverallScore((prevOverallScore) => ({
                    ...prevOverallScore,
                    score: res['overallScore'],
                    message: res['overallScoreMessage']
                }));

                // Set that the tab is reviewed
                // Find the currently open tab
                const currentOpenTab = tabs.find(tab => tab.isOpen);

                if (currentOpenTab) {
                    // Update the isReview property of the current open tab
                    const updatedTabs = tabs.map(tab => ({
                        ...tab,
                        isReview: tab === currentOpenTab ? true : tab.isReview,
                        scores: tab === currentOpenTab ? scores : tab.scores.length > 0 ? tab.scores : [],
                        overallScore: tab === currentOpenTab ? overallScore : tab.overallScore ? tab.overallScore : null,
                    }));
                    setTabs(updatedTabs);
                }

                setIsLoading(false);
            })
            .catch(res => {
                //TODO
                alert(res);
                setIsLoading(false);
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
                                <p className={cx('overall-score-text')}>{overallScore?.score}</p>
                            </div>
                            <p className={cx('overall-score-message')}>{overallScore?.message}</p>
                        </div>
                    </> :
                    <button onClick={onReview} className={cx('analyze-button')}>
                        Analyze code
                        {isLoading && <img className={cx('spinner-logo')} src={logo} alt='The logo of the web application' />}
                    </button>
                }
                {errors.reviewError && <p className={cx('analyze-button-error-message')}>Please add the aspects upon which the review will be based.</p>}

                {scores?.map((x, index) => (
                    <Score
                        key={index}
                        id={index}
                        name={x.name}
                        score={x.score}
                        scoreMessage={x.scoreMessage}
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