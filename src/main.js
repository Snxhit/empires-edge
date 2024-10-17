import { render } from 'preact';
import { useState } from 'preact/hooks';
import './style.css';
import { database } from './database';

function Game() {
  const [statusMsg, setStatusMsg] = useState('');

  const onSignUp = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const username = event.target.username.value.trim();
    
    try {
      const { data, error } = await database.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        // Create user in the users table
        const { error: insertError } = await database
          .from('users')
          .insert({ 
            id: data.user.id, 
            username: username,
            clicks: 0 
          });

        if (insertError) throw insertError;

        setStatusMsg('Sign up successful! User created in database.');
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setStatusMsg('Sign up failed. Error: ' + error.message);
    }
  };

  return (
    <div className="parentContainer">
      <div className="sidePanel">
      </div>
      <form onSubmit={onSignUp}>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />
        <input type="password" id="password" name="password" placeholder="Choose a password" required />
        <input type="text" id="username" name="username" placeholder="Please enter a username" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>{statusMsg}</p>
    </div>
  );
}

render(<Game />, document.getElementById('game'));