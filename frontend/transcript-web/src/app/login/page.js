// To inform next js, this is a client component; in order to import useState... 
"use client"; 

// import Image from "next/image";
import { useRouter } from 'next/navigation'
import styles from './login.module.css'; 
import { useState } from 'react';

// <Link href="/Upload"> Login </Link> KEEP IN VIEW.

export default function Login() {
  const INCOMPLETE = -1; // incomplete username or password
  const INCORRECT = 0; // wrong username or password filled in
  const CORRECT = 1; // correct details

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, updateLoginStatus] = useState(null); // is it a good idea to use null?

  /* WAIT NO NEED CODE ALSO CAN REGISTER ENTER BUTTON?
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };*/

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') { // placeholder code
      console.log("can");
      updateLoginStatus(CORRECT);
      router.push('/upload')
    } 
    else if (username && password) { // Incorrect login attempt
      updateLoginStatus(INCORRECT);
      console.log('Incorrect login attempt');
    }
    else if (!username || !password) { // Missing fields
      updateLoginStatus(INCOMPLETE);
    }
    
  };


  return ( // don't want main.....styles.main or styles.description
    <div className={styles.main}>
        <h1>Transcription Service</h1>
        <div className={styles.loginForm}>
          <h2>Login</h2>
          <div className={styles.loginBox}>
            <label htmlFor="username">Username:</label>
            <input type="text" 
              id="username" 
              name="username" 
              placeholder="Enter your Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)} 
              required
            />

            <label htmlFor="password">Password:</label>
            <input type="password"
              id="password" 
              name="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)} 
              required
            />
            <div className={styles.error}>
              {loginStatus == INCORRECT ? (
                <p>Incorrect Username or Password.</p>
              ) : loginStatus == INCOMPLETE ? (
                <p>Please fill in your Username or Password.</p>
              ) : (<></>)
              }
            </div>
          </div>

          <div className={styles.loginButton}>
            <button type="submit" onClick={handleLogin}>
            Login
            </button>
          </div>
        </div>
      
    </div>
  );
}
