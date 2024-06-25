import React, { useEffect, useRef, useState } from 'react';
import TypingEffect from 'react-typing-effect';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import teacher from "./assets/teacher.png";
import './final.css';

const FireworksCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function createFirework() {
      return {
        x: random(0, canvas.width),
        y: random(0, canvas.height / 2), // Αλλάζουμε το y για να εμφανίζεται πιο πάνω
        radius: random(10, 10),
        color: `hsl(${random(0, 360)}, 100%, 60%)`,
        speed: random(7, 12), // Αυξάνουμε την ταχύτητα
        direction: -Math.PI / 2,
        opacity: 1
      };
    }

    const fireworks = [];

    function update() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (fireworks.length < 100) {
        fireworks.push(createFirework());
      }

      for (let i = 0; i < fireworks.length; i++) {
        const firework = fireworks[i];
        firework.x += firework.speed * Math.cos(firework.direction);
        firework.y += firework.speed * Math.sin(firework.direction);
        firework.opacity -= 0.02;

        context.beginPath();
        context.arc(firework.x, firework.y, firework.radius, 0, 2 * Math.PI);
        context.fillStyle = firework.color;
        context.globalAlpha = firework.opacity;
        context.fill();

        if (firework.opacity <= 0) {
          fireworks.splice(i, 1);
        }
      }

      requestAnimationFrame(update);
    }

    update();
  }, []);

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};

const Final = () => {
  
  const [score, setScore] = useState(null);
  const location = useLocation();
  const myData = location.state?.myData;

  

  useEffect(() => {
    const fetchScore = async () => {
      try {

        const response = await axios.get('http://localhost:8080/api/answers/get_score', {
          params: { userId: myData } 
        });
        setScore(response.data);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    fetchScore();
  }, []);

  let message;
if (score !== null) {
  switch (true) {
    case 20-score >= 18:
      message = `Εξαιρετική επίδοση! Έχετε ολοκληρώσει το εκπαιδευτικό μάθημα με σκορ ${20-score} / 20! Συγχαρητήρια!`;
      break;
    case 20-score >= 15:
      message = `Πολύ καλή απόδοση! Ολοκληρώσατε το εκπαιδευτικό μάθημα με σκορ ${20-score} / 20! Συνεχίστε έτσι!`;
      break;
    case 20-score >= 10:
      message = `Καλή απόδοση! Ολοκληρώσατε το εκπαιδευτικό μάθημα με σκορ ${20-score} / 20. Συνεχίστε την προσπάθεια!`;
      break;
    default:
      message = `Χρειάζεται περαιτέρω βελτίωση. Ολοκληρώσατε το εκπαιδευτικό μάθημα με σκορ ${20-score} / 20. Μην το βάζετε κάτω!`;
  }
} else {
  message = 'Φορτώνει το σκορ...';
}

const displayText = message;


  return (
    <div>
    <div className="registration-container">
        <img src={teacher} alt="Left" className="side-image left" />
        <div className="form-container">
        <TypingEffect
          text={displayText}
          speed={70}
          eraseSpeed={0}
          eraseDelay={100000}
          typingDelay={500}
        />
      </div>
    </div>
          <FireworksCanvas />
          </div>


  );
};

export default Final;
