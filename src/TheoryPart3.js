import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TypingEffect from 'react-typing-effect';
import { useNavigate } from 'react-router-dom';
import image1 from "./assets/image10.jpeg";
import image2 from "./assets/image2.jpeg";
import image3 from "./assets/image3.jpeg";
import image4 from "./assets/image4.jpeg";
import image5 from "./assets/image5.jpeg";
import image6 from "./assets/image6.webp";
import image7 from "./assets/image7.jpeg";

import './BackgroundSlider.css';



const TheoryPart2 = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7];

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
        const response = await axios.get('http://localhost:8080/api/theory-parts/module-3');//change on backend
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
      <div className='title3'>
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
