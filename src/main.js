import { render } from 'preact';
import { useState } from 'preact/hooks';
import './style.css';
import { database } from './database';

function Game() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleClick = async () => {
    if (!username) {
      setStatusMsg('Please enter a username first.');
      return;
    }
    const newCount = count + 1;
    setCount(newCount);
    const { error } = await database
      .from('users')
      .update({ clicks: newCount })
      .eq('username', username);
    if (error) {
      console.error('Error updating clicks:', error);
      setStatusMsg('Failed to update click count. Please try again.');
    }
  };

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.username.value.trim();
    const password = event.target.password.value.trim();
    console.log(name, password)
  }
 /* const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    const userInput = event.target.username.value.trim();
    
    if (!userInput) {
      setStatusMsg('Please enter a valid username.');
      return;
    }

    // First, try to fetch the existing user
    const { data: existingUser, error: fetchError } = await database
      .from('users')
      .select('clicks')
      .eq('username', userInput)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user:', fetchError);
      setStatusMsg('An error occurred. Please try again.');
      return;
    }

    if (existingUser) {
      // User exists, update the local state
      setUsername(userInput);
      setCount(existingUser.clicks);
      setStatusMsg(`Welcome back, ${userInput}! You have ${existingUser.clicks} clicks.`);
    } else {
      // User doesn't exist, create a new one
      const { data: newUser, error: insertError } = await database
        .from('users')
        .insert({ username: userInput, clicks: 0 })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating user:', insertError);
        setStatusMsg('An error occurred. Please try again.');
      } else {
        setUsername(userInput);
        setCount(0);
        setStatusMsg(`Welcome, ${userInput}! You're starting with 0 clicks.`);
      }
    }
  }; */

  return (
    <div className="parentContainer">
      <div className="sidePanel">
      </div>
      <form onSubmit={handleUsernameSubmit}>
        <input type="text" id="username" name="username" placeholder="Enter your username" required />
        <input type="password" id="password" name="pass" placeholder="Please enter a password" required />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleClick}>Click Me!</button>
      <p>{statusMsg}</p>
      <p>Click Count: {count}</p>
    </div>
  );
}

render(<Game />, document.getElementById('game'));