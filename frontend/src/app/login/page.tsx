"use client"; // inform nextJS this is client component; in order to import useState... 

// import Image from "next/image";
import styles from './login.module.css'; 
import { useRef, useEffect } from 'react' 
import {useFormState } from 'react-dom';
import { authenticate } from "../lib.ts";
import { EMPTY, INVALID, VALID } from '../constants';
import { useRouter, redirect } from 'next/navigation';
import { getSession, hasAuthCookies } from "../lib.ts";

//import Login from './login';
//import { AuthProvider } from '../context/authcontext'

export default function LoginPage() { // to add ASYNC? but warning -- cannot for client components
 // const session = await getSession();
  //const router = useRouter();
  //const [username, setUsername] = useState<string>(''); // no <string> mention = type-inferred as string
  //const [password, setPassword] = useState<string>('');

  const [loginStatus, formAction] = useFormState(authenticate, null); // update state based on the result of a form action.
     // [   state,   formAction] = useFormState(function, initialState, permalink?); 
     // The form state is the value returned by the action when the form was last submitted. If the form has not yet been submitted, it is the initial state that you pass.
  
  const hasCookies = useRef<boolean>(); // almost but GOT PROBLEM.
  const router = useRouter();
     //const huh = getSession();
  //console.log(huh);
  //hasAuthCookies().then(value => { hasCookies.current = value; }); // initial render got error

  /*
  useEffect(() => {
    hasAuthCookies().then(value => { hasCookies.current = value; }); // initial render got error, but put in useEffect ok. HMMM
    if (hasCookies.current == true) { router.push("/upload"); }
  })*/

  console.log(hasCookies.current)
  return ( // don't want main.....styles.main or styles.description
    <div className={styles.main}>
        <h1>Transcription Service</h1>
        <div className={styles.loginForm}>
            <h2>Login</h2>
            <form action={formAction}>
            <div className={styles.loginBox}>
              
              <label htmlFor="username">Username:</label>
              <input type="text" 
                id="username" 
                name="username" 
                placeholder="Enter your Username" 
              />
  
              <label htmlFor="password">Password:</label>
              <input type="password"
                id="password" 
                name="password"
                placeholder="Enter your Password"
              />
              </div>
              <div className={styles.error}>{loginStatus !== VALID && <p>{decode(loginStatus)}</p>}</div>
            <div className={styles.loginButton}>
              <button type="submit">
                Login
              </button>
            </div>
            </form>
            </div>      
    </div>
    
  );
  
  
}

function decode(loginStatus: number | null) {
  if (loginStatus === INVALID) { return "Incorrect Username and Password."; }
  else if (loginStatus === EMPTY) { return "Please fill in your Username or Password."; }
}



/*
<AuthProvider>
  <Login></Login>
</AuthProvider>
*/

/* TO ADD IT BACK
<div className={styles.error}>
                {loginStatus == INCORRECT ? (
                  <p>Incorrect Username or Password.</p>
                ) : loginStatus == INCOMPLETE ? (
                  <p>Please fill in your Username or Password.</p>
                ) : (<></>)
                }
              </div>*/

/* DRAFT 2 */
/*<div className={styles.main}>
        <h1>Transcription Service</h1>
        <div className={styles.loginForm}>
            <h2>Login</h2>
            <form action={submitForm}>
            <div className={styles.loginBox}>
              
              <label htmlFor="username">Username:</label>
              <input type="text" 
                id="username" 
                name="username" 
                placeholder="Enter your Username" 
                required
              />
  
              <label htmlFor="password">Password:</label>
              <input type="password"
                id="password" 
                name="password"
                placeholder="Enter your Password"
                required
              />
              
              </div>
  
            <div className={styles.loginButton}>
              <button type="submit">
              Login
              </button>
            </div>
            </form>
            <pre>{JSON.stringify(session, null, 3)}</pre>
          </div>      
    </div>
    */