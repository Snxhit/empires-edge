import { render } from 'preact';
import { useState } from 'preact/hooks';
import './style.css';
import { supabase } from './database';

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

    const { error } = await supabase
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
    const userInput = event.target.username.value.trim();
    
    if (!userInput) {
      setStatusMsg('Please enter a valid username.');
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .upsert({ username: userInput, clicks: 0 }, { onConflict: 'username' })
      .select()
      .single();

    if (error) {
      console.error('Error creating/fetching user:', error);
      setStatusMsg('An error occurred. Please try again.');
    } else {
      setUsername(userInput);
      setCount(data.clicks);
      setStatusMsg(`Welcome, ${userInput}! You have ${data.clicks} clicks.`);
    }
  };

  return (
    <div className="parentContainer">
      <div className="sidePanel">
        {/* Add your UI components here */}
      </div>
      <form onSubmit={handleUsernameSubmit}>
        <input type="text" id="username" name="username" placeholder="Enter your username" required />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleClick}>Click Me!</button>
      <p>{statusMsg}</p>
      <p>Click Count: {count}</p>
    </div>
  );
}

render(<Game />, document.getElementById('game'));