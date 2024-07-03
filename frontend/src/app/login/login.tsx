"use client"; // client component

import styles from "./styles.module.css";
import { useFormState } from "react-dom";
import { authenticate } from "../lib.ts";

export default function Login() {
  const [errorStatus, formAction] = useFormState(authenticate, null); // update state based on the result of a form action.

  return (
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
        </div>
        <div className={styles.error}>{<p>{errorStatus}</p>}</div>
        <div className={styles.loginButton}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
