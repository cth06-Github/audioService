// import Image from "next/image";
import styles from './login.module.css'; 
import Login from './login';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';


export default async function LoginPage() { // to add ASYNC? but warning -- cannot for client components
  const authCookies = await cookies().get("session"); 
  if (authCookies !== undefined) { redirect("/upload"); }

  return ( // don't want main.....styles.main or styles.description
    <div className={styles.main}>
        <h1>Transcription Service</h1>  
        <Login></Login> 
    </div>
  );
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