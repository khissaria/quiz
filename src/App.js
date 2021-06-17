import './App.css';
import React from 'react';
import Navbar from './Navbar';
import Quiz from './quiz';
import Home from './Home';
import Footer from './footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <Navbar />
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/quiz/:quizID' exact component={Quiz} />
      </Router>
      <Footer/>
    </>
  );
}

export default App;
