/*import styles from './login.module.css'; 
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/authcontext' 

export default function Login() { 
    const INCOMPLETE: number = -1; // incomplete username or password
    const INCORRECT: number = 0; // wrong username or password filled in
    const CORRECT: number = 1; // correct details
  
    const router = useRouter();
    const [username, setUsername] = useState<string>(''); // no <string> mention = type-inferred as string
    const [password, setPassword] = useState<string>('');
    const [loginStatus, updateLoginStatus] = useState<number | null>(null); // is it a good idea to use null?
    const {authStatus, updateAuthStatus, AUTHENTICATED, INVALID} = useAuthContext();
    console.log(authStatus, AUTHENTICATED, INVALID)

    /* WAIT NO NEED CODE ALSO CAN REGISTER ENTER BUTTON?
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleLogin();
      }
    };*/
 /*
    const handleLogin = () => {
      if (username === 'admin' && password === 'admin') { // placeholder code
        console.log("can");
        updateLoginStatus(CORRECT);
        updateAuthStatus(AUTHENTICATED);
        router.push('/upload')
        //console.log(INVALID);
        //console.log(AUTHENTICATED);
        //console.log(authStatus);
        
      } 
      else if (username && password) { // Incorrect login attempt
        updateLoginStatus(INCORRECT);
        console.log('Incorrect login attempt');
      }
      else if (!username || !password) { // Missing fields
        updateLoginStatus(INCOMPLETE);
      }
      
    };
  
    /* IF LOGIN STATUS IS TRUE, then users should be directed to upload page*/
    /*useEffect(() => {
      if (authStatus === AUTHENTICATED) { // semantically wise it is a bit off...loggED in implies login status is correct
          router.push("/upload")
      }
    })*/ // won't work complete as entering url = refreshing the connection and the authStatus just disappears. 
  /*
    console.log("my auth" + authStatus);
  
    return ( 
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
    );
  }*/