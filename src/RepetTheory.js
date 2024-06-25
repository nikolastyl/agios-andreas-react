import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TypingEffect from 'react-typing-effect';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ProgressBar from 'react-animated-progress-bar';

import image1 from "./assets/image10.jpeg";
import image2 from "./assets/image2.jpeg";
import image3 from "./assets/image3.jpeg";
import image4 from "./assets/image4.jpeg";
import image5 from "./assets/image5.jpeg";
import image6 from "./assets/image6.webp";
import image7 from "./assets/image7.jpeg";

import './BackgroundSlider.css';

const RepetTheory = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7];

  const [currentImage, setCurrentImage] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [repQuestions, setRepQuestions] = useState([]);

  const [currentChapter, setCurrentChapter] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const myData = location.state?.myData;


  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/answers/checking', {
          params: { userId: myData }
        });
  
        // Ανανέωση των state chapters και repQuestions με τα δεδομένα από τον server
        setChapters(response.data.theoryPartsToExercise);
        setRepQuestions(response.data.questionsToExercise);
  
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };
  
    fetchChapters();
  
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 7000);
  
    return () => clearInterval(interval);
  }, [images.length]);



  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgressBar(false);
    }, 5000); // εξαφανίζεται μετά από 5 δευτερόλεπτα

    return () => clearTimeout(timer);
  }, []);

  

  const handleNextChapter = () => {
    setCurrentChapter((prevChapter) => (prevChapter + 1) % chapters.length);
    console.log(currentChapter)
  };

  

  return (
    <div>
      {showProgressBar && (
        <div className='progress-container'>

        <h1>Δώσε μου μερικά δευτερόλεπτα να ελέγξω τις απαντήσεις σου και να δώ αν χρειάζεσαι κάπου επανάληψη...</h1>
      
        <div className='progress-bar'>
          <ProgressBar width="330" trackWidth="30" percentage="99" />
        </div>
        </div>

      )}
      {!showProgressBar && chapters.length === 0 && (
  <div className='progress-container'>
    <h1>Οι επιδόσεις σου ήταν αρκετά καλές και δεν χρειάζεσαι επανάληψη!!</h1>
    <h3>Μπορείς να δεις το παρακάτω βίντεο και να ταξιδέψεις στον Ναό του Αγίου Ανδρέα στην Πατρα...  </h3>
    <h3>&darr; &darr;</h3>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/Rc99ukbdo6E" 
      title="YouTube Video"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div className='buttonOnRepeat'>
      <br></br>
      <button onClick={() => navigate('/repet-test', { state: { myData: myData, repQuestions: repQuestions } })}>Πάμε απευθείας στο επαναληπτικό Τεστ!!  <br></br> &#8594;</button>
    </div>
  </div>
)}

      {!showProgressBar && !(chapters.length===0) && (
        <div className='btns'>
        <div className='title2'>
        <div className='parent-container'>
        <h2>{chapters[currentChapter]?.titleOfPart}</h2>
        </div>
        </div>
        <div className="background-container">
          <div
            className="background-slider"
            style={{ backgroundImage: `url(${images[currentImage]})` }}
          >
            <div className="content">
              {chapters.length > 0 && (
                <TypingEffect
                key={chapters[currentChapter]?.id} // Χρήση του id του κεφαλαίου ως key
                text={[chapters[currentChapter]?.content || '']}
                speed={70}
                eraseSpeed={0}
                eraseDelay={100000}
                typingDelay={500}
              />
              )}
            </div>
          </div>
        </div>
  
        {currentChapter < chapters.length-1 && (
        <button className='rightButton' onClick={() => {handleNextChapter(); }}>Επόμενο <br></br> &#8594;</button>
              )}
        {currentChapter === chapters.length-1 && (
        <button className='rightButton' onClick={() => navigate('/repet-test', { state: { myData: myData, repQuestions:repQuestions } })}>Πάμε στο επαναληπτικό τέστ <br></br> &#8594;</button>
              )}
  
        </div>

        )}
    </div>
  );
}

export default RepetTheory;
