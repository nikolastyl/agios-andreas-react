import React, { useState } from 'react';
import axios from 'axios';
import teacher from "./assets/teacher.png";
import './welcome.css';
import { useNavigate } from 'react-router-dom';


export const Welcome = (props) => {

  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting username:', username);

    try {
      const response = await axios.get('http://localhost:8080/check-username', {
        params: { username: username }
      });
      console.log('Response from backend:', response);
        setError('');  // Clear any previous error
        setError(response.data);
        if(response.data===''){
          setError('');  // Clear any previous error
          const response = await axios.get('http://localhost:8080/find-id', {
          params: { username: username }});
          console.log(response.data)
          navigate('/theory-part-1', { state: { myData: response.data } })
        }
    } catch (error) {
      console.error('Error checking username:', error);
      setError('');  // Clear any previous error
      setError('Υπήρξε σφάλμα κατά τον έλεγχο του ονόματος χρήστη. Προσπαθήστε ξανά.');
    }
  };

  return (
    <div className='title'>
      <h2>Καλώς ήρθες στο μάθημα για τον ναό <br></br>του Αγίου Aνδρέα Πατρών!!</h2>
      <div className="registration-container">
        <img src={teacher} alt="Left" className="side-image left" />
        <div className="form-container">
          <h3>Δώσε ένα όνομα χρήστη που θα χρησιμεύσει στην αποθήκευση των επιδόσεών σου.</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleUsernameChange}
              />
            </label>
            <br />
            <button type="submit">Επόμενο &#8594;</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
