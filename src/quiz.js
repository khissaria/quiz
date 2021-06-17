import './App.css';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import Table from './table.js';
import Debutant from './debutant'
import Question from './questions';
import NewZealand from './newzealand'


function Quiz() {
    debugger;
     var {quizID} = useParams();
    quizID=parseInt(quizID);
    var entries=Debutant;
    const questionDetail=Question.find(q=> q.id===quizID);
    if(questionDetail===undefined)
    {
        window.location='/';
    }
    if(questionDetail.questionFile==='Debutant'){
        entries = Debutant;
    }
    if(questionDetail.questionFile==='newzealand'){
        entries = NewZealand;
    }
    const [inputValue, setInputValue] = useState("");
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(1);
    const [pause, setPause] = useState(false);
    const [gameStart, setGameStart] = useState(0);
    const [totalCount, setTotalCount] = useState(entries.length);
    const [score, setScore] = useState(0);
    const [scorePercentage, setScorePercentage] = useState(0);

    const handleStartClick = (e) => {
        setGameStart(1);
        setMinutes(questionDetail.time);
        setSeconds(0);
        setPause(true);

    }


    useEffect(() => {
        if (score === totalCount) {
            handleGiveUp();
        }
        if (pause) {

            let myInterval = setInterval(() => {
                if (minutes === 0 && seconds === 1) {
                    handleGiveUp();
                    return;
                }
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === -1) {
                        clearInterval(myInterval);
                    } else {
                        if (minutes === 1) {
                            setSeconds(59);
                            setMinutes(0);
                        }
                        else {
                            setMinutes(minutes - 1);
                            setSeconds(59);
                        }
                    }
                }
            }, 1000)
            return () => {
                clearInterval(myInterval);
            };
        }
    });
    const handleSearch = (e) => {
        setInputValue(e.target.value);

        let obj = entries.find(o => o.searchColumn.toLowerCase() === e.target.value.toLowerCase() || o.column2.toLowerCase() === e.target.value.toLowerCase());

        if (obj) {
            let id = 'slot' + obj.id;
            const el1 = document.querySelector('#' + id);
            el1.innerHTML = obj.column2;
            setInputValue('');
            setScore(score + 1);
            let count = score;

            if (count === totalCount) {
                handleGiveUp();
            }
        }
    }
    const handleGiveUp = (e) => {

        setPause(false);
        setScorePercentage(Math.round((score / totalCount) * 100));
        entries.map((entries, index) => {
            let compId = 'slot' + entries.id;
            const el1 = document.querySelector('#' + compId);
            if (el1.innerHTML === '') {
                el1.innerHTML = entries.column2;
                el1.style.color = '#cc0000';

            }
        })
        setGameStart(2);
    }
    return (
        <div>

            <div id="question">
                {questionDetail.question}
            </div>
            <div id="gameHeaderWrapper">
                <div id="gameBarBox">
                    <div id="timerScoreBox">
                        <span id="scoreBox" className="smallLine">
                            <span className="timerScoreTitle">Score</span>
                            <span className="currentScore">{score}/{totalCount}</span>
                        </span>
                        <span id="timeBox" className="smallLine">
                            <span className="timerScoreTitle">Timer</span>
                            <span id="timeInnerBox">
                                {minutes === 0 && seconds === 0
                                    ? setGameStart(2)
                                    : <span id="time"> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                                }

                                {gameStart === 1 &&

                                    <span id="giveUp">
                                        <button onClick={handleGiveUp}>Give Up</button>
                                    </span>
                                }
                            </span>
                        </span>
                    </div>

                    <div id="playGameBar">

                        <div id="playGameBox">
                            {gameStart === 0 &&

                                <div id="playPadding">
                                    <button className="button-wrapper fake-link game-button" onClick={handleStartClick}>
                                        <div id="button-play" className="lrg"><span>Start</span></div>
                                    </button>
                                </div>}

                            {gameStart === 1 &&

                                <div id="answer-wrapper" >
                                    <div id="answerBox">
                                        <div id="answerText">Enter answer:</div>
                                        <div><input type="text" id="gameinput" className="answerEntry" onChange={handleSearch} value={inputValue} autoCapitalize="off" spellCheck="false" autoComplete="off" autoCorrect="off" /></div>
                                    </div>
                                </div>
                            }
                        </div>
                        {gameStart === 2 && <div id="postGameBox" >
                            <div id="shareResult">
                                <div id="gameOverMsg">
                                    You got <span id="userPct">{scorePercentage}</span>% correct answers
                                </div>
                            </div>
                        </div>}


                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
            <table id="gameTable">
                <tbody>
                    <tr>
                        <td valign="top" className="gametable-col">
                            <Table  quizID={quizID}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Quiz;