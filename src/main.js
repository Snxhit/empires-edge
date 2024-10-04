import { render } from 'preact';
import { useState } from 'preact/hooks';
import './style.css';
import { app, database } from './firebase';
import { getDatabase, ref, set, get } from 'firebase/database';

function Game() {
  // Click count state
  const [count, setCount] = useState(0);
  // Firebase database reference
  const db = getDatabase(app);
  const [username, setUsername] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  // Function to handle click
  const handleClick = async () => {
    // Increment locally
    setCount(prevCount => prevCount + 1);

    // Update count in database
    if (username) {
      const userRef = ref(db, `users/${username}`);
      await set(userRef, { clicks: count + 1 });
    }
  };

  // Function to handle username submission
  const usernameSubmit = async (event) => {
    event.preventDefault();
    const userInput = document.getElementById('username').value;
    setUsername(userInput);

    const userRef = ref(db, `users/${userInput}`);
    const userData = await get(userRef);

    if (userData.exists()) {
      const data = userData.val();
      setCount(data.clicks);
      setStatusMsg(`Welcome back ${userInput}, you are resuming from ${data.clicks} clicks!`);
    } else {
      setCount(0);
      setStatusMsg(`Welcome to Empire's Edge, ${userInput}!`);
    }
  };

  return (
    <div>
      <h1>Tester Counter</h1>
      <p>Current Count: {count}</p>
      <button onClick={handleClick}>Increment!</button>
      <form id="usernameForm" onSubmit={usernameSubmit}>
        <input type="text" id="username" placeholder="Identify yourself" />
        <button type="submit">
          Submit
        </button>
      </form>
      <p id="status">{statusMsg}</p>
    </div>
  );
}

render(<Game />, document.getElementById('game'));
