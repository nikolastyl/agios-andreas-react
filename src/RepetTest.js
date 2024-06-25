import React, { useEffect, useState } from 'react';
import TypingEffect from 'react-typing-effect';
import { useNavigate, useLocation } from 'react-router-dom';

import image1 from "./assets/image10.jpeg";
import image2 from "./assets/image2.jpeg";
import image3 from "./assets/image3.jpeg";
import image4 from "./assets/image4.jpeg";
import image5 from "./assets/image5.jpeg";
import image6 from "./assets/image6.webp";
import image7 from "./assets/image7.jpeg";

import './BackgroundSlider.css';

const RepetTest = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7];

  const [currentImage, setCurrentImage] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const myData = location.state?.myData;
  const repQuestions = location.state?.repQuestions;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleNextQuestion = () => {
    handleAnswerSubmit();
    setCurrentQuestion((prevQuestion) => (prevQuestion + 1) % repQuestions.length);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setIsCorrect(null);
    setIsAnswered(false);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (repQuestions[currentQuestion].correct_answer === answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setCorrectAnswer(repQuestions[currentQuestion].correct_answer);
  };

  const handleAnswerSubmit = async () => {
    if (selectedAnswer !== null) {
      // Ελέγχουμε την ορθότητα της απάντησης και ορίζουμε το χρώμα ανάλογα
      if (selectedAnswer === repQuestions[currentQuestion].correct_answer) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
      setCorrectAnswer(repQuestions[currentQuestion].correct_answer);
      setIsAnswered(true);
    }
  };

  return (
    <div className='btns'>
      <div className='title2'>
        <div className='parent-container'>
          <h2>Επαναληπτικό τέστ αξιολόγησης</h2>
        </div>
      </div>
      <div>
        <div
          className="background-slider"
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        >
          <div className="content">
            {repQuestions.length > 0 && (
              <>
                <TypingEffect
                  key={repQuestions[currentQuestion]?.id}
                  text={[repQuestions[currentQuestion]?.question || '']}
                  speed={70}
                  eraseSpeed={0}
                  eraseDelay={100000}
                  typingDelay={500}
                />
              </>
            )}
            <div className="answers">
              {['option1', 'option2', 'option3', 'option4'].map((option, index) => (
                repQuestions[currentQuestion]?.[option] && (
                  <div key={index}>
                    {isAnswered && (
                      <div
                        style={{
                          backgroundColor:
                            selectedAnswer === repQuestions[currentQuestion][option]
                              ? isCorrect
                                ? 'green'
                                : 'red'
                              : correctAnswer === repQuestions[currentQuestion][option]
                              ? 'green'
                              : 'transparent',
                        }}
                      >
                        <input
                          type="radio"
                          id={`answer-${repQuestions[currentQuestion].id}-${index}`}
                          name={`answer-${repQuestions[currentQuestion].id}`}
                          value={repQuestions[currentQuestion][option]}
                          checked={selectedAnswer === repQuestions[currentQuestion][option]}
                          onChange={() => handleAnswerSelect(repQuestions[currentQuestion][option])}
                          disabled={selectedAnswer !== null}
                        />
                        <label htmlFor={`answer-${repQuestions[currentQuestion].id}-${index}`}>
                          {repQuestions[currentQuestion][option]}
                        </label>
                      </div>
                    )}
                    {!isAnswered && (
                      <div key={index}>
                        <input
                          type="radio"
                          id={`answer-${repQuestions[currentQuestion].id}-${index}`}
                          name={`answer-${repQuestions[currentQuestion].id}`}
                          value={repQuestions[currentQuestion][option]}
                          checked={selectedAnswer === repQuestions[currentQuestion][option]}
                          onChange={() => handleAnswerSelect(repQuestions[currentQuestion][option])}
                        />
                        <label htmlFor={`answer-${repQuestions[currentQuestion].id}-${index}`}>
                          {repQuestions[currentQuestion][option]}
                        </label>
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedAnswer !== null && currentQuestion < repQuestions.length - 1 && isAnswered && (
        <button className='rightButton' onClick={handleNextQuestion}>Επόμενο <br/> &#8594;</button>
      )}
        <div className='submitBtnContainer'>
            <button onClick={() => setIsAnswered(true)}>Υποβολή</button>
        </div>      
        {selectedAnswer !== null && currentQuestion === repQuestions.length - 1 && (
        <button className='rightButton' onClick={() => navigate('/final', { state: { myData: myData } })}>Τέλος<br /> &#8594;</button>
      )}
    </div>
  );
};

export default RepetTest;
