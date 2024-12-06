import React, { useState, useEffect } from "react";
import axios from "axios";
import "./page2Quiz.css";

const Page2Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  // Fetch quiz questions from backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/quiz");
        setQuizQuestions(response.data[0].questions); // Assuming the backend returns an array of quizzes
        setLoading(false);
      } catch (err) {
        setError("Failed to load quiz data");
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(Number(event.target.value));
  };

  const handleSubmit = async () => {
    const correctAnswerText =
      quizQuestions[currentQuestionIndex].correctAnswer; // Get the correct answer
    
    if (selectedOption === correctAnswerText) {
      setScore((prevScore) => prevScore + 1);
    } else {
      // If the answer is incorrect, add to the list of incorrect answers
      setIncorrectAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          question: quizQuestions[currentQuestionIndex].question,
          correctAnswer: quizQuestions[currentQuestionIndex].options[correctAnswerText],
          userAnswer: quizQuestions[currentQuestionIndex].options[selectedOption]
        }
      ]);
    }
  
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
  
      // Submit the score to the backend
      try {
        await axios.post("http://localhost:3000/api/quiz/results", {
          score,
          total: quizQuestions.length,
        });
      } catch (err) {
        console.error("Failed to submit quiz results:", err.message);
      }
    }
  
    setSelectedOption(null);
  };
  
  const progress = (currentQuestionIndex / quizQuestions.length) * 100;

  if (loading) return <div>Loading quiz...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {/* Bubbles and Fish Animation */}
      <div className="bubble-container">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="bubble" style={{ animationDelay: `${Math.random() * 2}s` }}></div>
        ))}
      </div>
      <img
        src="https://png.pngtree.com/png-vector/20230814/ourmid/pngtree-blue-cartoon-fish-sticker-on-a-white-background-vector-png-image_6892122.png"
        className="fish-animation-right "
        alt="Fish Right"
        
      />
      <img
        src="https://png.pngtree.com/png-vector/20240204/ourmid/pngtree-cute-cartoon-starfish-png-image_11608048.png"
        className="fish-animation-left"
        alt="Fish Left"
      />
      <div className="header">🌊 Ocean Cyber Quest</div>
      {!quizCompleted && quizQuestions.length > 0 && (
        <div className="question-container">
          <div className="question">{quizQuestions[currentQuestionIndex].question}</div>
          <div className="options">
            {quizQuestions[currentQuestionIndex].options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="question"
                  id={`q${currentQuestionIndex}-opt${index}`}
                  value={index}
                  onChange={handleOptionChange}
                  checked={selectedOption === index}
                />
                <label htmlFor={`q${currentQuestionIndex}-opt${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="progress-bar">
        <div style={{ width: `${progress}%` }}></div>
      </div>
      {!quizCompleted && (
        <button id="submit-quiz" className="btn-submit" onClick={handleSubmit}>
          Soumettre le Quiz
        </button>
      )}
      {quizCompleted && (
        <div className="result-container">
          <p>Vous avez navigué à travers les vagues avec un score de :</p>
          <div className="result-score">
            {score} / {quizQuestions.length}
          </div>
          <div className="feedback">
            {score >= quizQuestions.length / 2
              ? "Bravo, vous avez bien progressé en cybersécurité!"
              : (
                <>
                  <p className="alert alert-danger">
                    Il semble qu'il y ait des améliorations à faire en cybersécurité.
                    Vous pouvez vous attaquer aux bases de la cybersécurité pour progresser.
                  </p>
                </>
              )}
            <div className="incorrect-answers">
              <h3>Réponses Incorrectes</h3>
              {incorrectAnswers.map((answer, index) => (
                <div key={index} className="incorrect-answer">
                  <p><strong>Question:</strong> {answer.question}</p>
                  <p><strong>Votre réponse:</strong> {answer.userAnswer}</p>
                  <p><strong>Réponse correcte:</strong> {answer.correctAnswer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="footer">
        Merci d'avoir participé à Ocean Cyber Quest ! 🌊
      </div>
    </div>
  );
};

export default Page2Quiz;
