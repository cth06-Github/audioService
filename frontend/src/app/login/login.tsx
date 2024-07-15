"use client"; // client component

import styles from "./styles.module.css";
import { useFormState } from "react-dom";
//import { useUserContext, UserContext2 } from "../(context)/usercontext";
import { useState } from "react";
import { authenticate } from "../lib-authen.ts";


export default function Login() {
  const [errorStatus, formAction] = useFormState(authenticate, null); // update state based on the result of a form action.
  //const [usernameInput, setUsername] = useState<string>(""); 
  return (  // onChange={(event) => setUsername(event.target.value) ||| <UserContext2.Provider value = {usernameInput}>
    
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form action={formAction}>
          <div className={styles.loginBox}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your Username"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
            />
            <span><p>{errorStatus}</p></span> {/*no span, cannot work*/}
          </div>
          <div className={styles.loginButton}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>

  );
}

