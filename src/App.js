import React, { useState } from 'react'
import questions from './data'

const App = () => {
 const [currentQuestion, setCurrentQuestion] = useState(0)
 const [score , setScore] = useState(0)
 const [showScore, setShowScore] = useState(false)
 const [clicked, setClicked] = useState(false)
 
const handleAnswer = (isCorrect) => {
  setClicked(true)
     if(isCorrect){
      setClicked(false)
      setScore(score+1)
      const nextQuestion = currentQuestion+1
      if(nextQuestion < questions.length){
       setCurrentQuestion(nextQuestion)
       setClicked(false)
      }else{
       setShowScore(true)
      }
     }else if(!isCorrect){
      setTimeout( () => {
        const nextQuestion = currentQuestion+1
       if(nextQuestion < questions.length){
        setCurrentQuestion(nextQuestion)
        setClicked(false)
       }else{
        setShowScore(true)
       }
       },2000)
     }
  
}

 const resetQuiz = () => {
   setCurrentQuestion(0)
   setScore(0)
   setShowScore(false)
   setClicked(false)
 }

 const getColor = (isCorrect) => {
  let color = ""
   if(clicked && isCorrect){
   color =   "green"
   }else if(clicked && !isCorrect){
     color = "red"
   }else{
    color = "#9e9e9e"
   }
   return color
 }

  return (
    
      <div>
        {showScore ? (
          <>
          <div className='score_container'>
            <div className='score'>
            <h1> You have scored {score} out of {questions.length}</h1>
            <button type='submit' onClick={resetQuiz}>Play Again!! </button>
            </div>
          </div>
          </>
        ) : (
          <>
        <div className='container'>
        <div className='header'>
          <h1>INDIA Quiz</h1>
          <h3> Current Score : {score}</h3>
        </div>
          <div className='quiz_container'>
          <h4 style={{color: "#fff"}}>Question {currentQuestion+1} out of {questions.length}</h4>
          <h4 style={{color: "#0f0766"}}> {questions[currentQuestion].question} </h4>
          <ul>
            {questions[currentQuestion].options.map((ele,indx) => {
              return  <li   style={{backgroundColor: getColor(ele.isCorrect)}}  key={indx} onClick={() => {handleAnswer(ele.isCorrect)}}> {ele.answer} </li>
            })}
          </ul>
          </div>
          </div>
          </>
        )}
        </div>
    
  )
}

export default App