import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TypingEffect from 'react-typing-effect';
import { useNavigate } from 'react-router-dom';
import stadio1 from "./assets/stadio1.jpg";
import stadio2 from "./assets/stadio2.jpg";
import odeio1 from "./assets/odeio1.jpg";

import './BackgroundSlider.css';



const TheoryPart2 = () => {
  const images = [stadio1,stadio2,odeio1];

  const [currentImage, setCurrentImage] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const myData = location.state?.myData;
  console.log(myData)


  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/theory-parts/module-3');
        setChapters(response.data);
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

  const handleNextChapter = () => {
    setCurrentChapter((prevChapter) => (prevChapter + 1) % chapters.length);
    console.log(currentChapter)
  };

  const handlePrevChapter = () => {
    setCurrentChapter((prevChapter) => (prevChapter - 1 + chapters.length) % chapters.length);
  };

  return (
    <div className='btns'>
      <div className='title2'>
      <div className='parent-container'>
      <h2>{chapters[currentChapter]?.titleOfPart || 'Welcome to the Presentation of the St. Andrew Church in Patras'}</h2>
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
              key={chapters[currentChapter]?.id} 
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

      {currentChapter > 0 && (
        <button className='leftButton' onClick={() => {handlePrevChapter(); }}> Προηγούμενο<br></br> &#8592;</button>
      )}
      {currentChapter < 3 && (
      <button className='rightButton' onClick={() => {handleNextChapter(); }}>Επόμενο <br></br> &#8594;</button>
            )}
      {currentChapter === 3 && (
      <button className='rightButton' onClick={() => navigate('/test3', { state: { myData: myData } })}>Πάμε στο τρίτο τέστ <br></br> &#8594;</button>
            )}

      </div>
  );
}

export default TheoryPart2;
