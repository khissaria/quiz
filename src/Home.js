import './App.css';
import React, { Component } from 'react';
import Question from './questions';
import pathan from './pathan.webp';
import NewZ from './newz.webp';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: Question
        }
    }
    renderContent() {
        
        return this.state.question.map((questionData, index) => {
            const { id, question, time, questionFile, author, date, img } = questionData;
            return (
                <div className="archive" key={id} id={id} >
                    <a href={'/quiz/'+id}>
                    <div className="archive-article-first">
                        <div className='img-div'>
                            <img className='flex-img' src={img} alt={img} data-was-processed="true" />
                        </div>
                        <div className="header-text">
                            <h1>{question}</h1>
                            <p>{time} minutes to name them all</p>
                            <footer>
                                <div className='address'>
                                    <strong>by {author}</strong>
                                    / <time >{date}</time>
                                </div>
                            </footer>
                        </div>
                    </div>
                    </a>
                </div>
            )
        })
    }

    render() {

        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default Home;