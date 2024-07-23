/*import Link for BigButton*/
// onClick={() => router.push(props.routing)}
/*
import Link from "next/link";

<Link href = {props.routing}>
</Link>
*/

/* CSS */
/* TRANSITION WIDTH: TRICK IS YOU CONTROL WIDTH FROM 0VW TO 90VW
.menuOpen {
        transition: width 0.5s;
        position: absolute;
        left:0px;
        top: 0px;
        bottom: 0px;
        right: 0px;
        padding: 0px 0px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        background-color: white;
        background: linear-gradient( /*need to @media dark theme
    /*linear-gradient(angle, color-stop1, color-stop2); 145deg,
    rgb(255, 255, 255),
    rgb(216, 215, 215),
    rgb(147, 165, 175),
    rgb(141, 195, 222),
    rgb(161, 228, 247),
    rgb(161, 219, 247)
  );
        height: 150vh;
        width: 0vw;
        backdrop-filter: blur(5px);        
        z-index: 1; /*just jack up number    
        overflow: hidden;
    }
  */

  
/*useEffect Help*/
/* HOW COME THE FOLLOWING IS NOT THE EQUIVALENT...
const [isVisible, setIsVisible] = useState<boolean | null>(null);
  useEffect(() => { 
    let visibility = !document.hidden;
    setIsVisible(document.visibilityState === 'visible');
    function handleVisibilityChange() {
      if (!visibility) {
        if (recordingStatus !== INACTIVE) {
        stopRecording();
        console.log("hidden 24680 was recording")
        } else {console.log("hidden never record")}
    } else {console.log("Visible, on the page")}
  }
    window.addEventListener('visibilitychange', handleVisibilityChange); // can document work?
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVisible]);
  
    // need tp see further.
  const pathname = usePathname();
  const [changes, setChanges] = useState(0);

  useEffect(() => {
    console.log(`Route changed to: ${pathname}`);
    setChanges((prev) => prev + 1);
  }, [pathname]);
  
  */


/* POTENTIALLY NEED IT */

//login.tsx// --- ATTEMPTS of useContext
/*const [usernameInput, setUsernameInput] = useState<string>("");
//const {username, setUsername} = useUserContext();
console.log(usernameInput)

const handler = (event: any) => {
 // setUsername(event.target.value)
  setUsernameInput(event.target.value)
}*/

/*interface UserType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;

      const [username, setUsername] = useState<string>(""); // actually can Boolean

}*/
/* no footer       <footer>
        <p>to insert footer?</p>
      </footer>*/


// authcontext.tsx //
/*
// Trick to catch errors? //
export const useAuthContext = () => {
    const localAuthContext = useContext(AuthContext);
    if (localAuthContext === undefined) {
      throw new Error('useAuthContext must be inside an AuthProvider');
    }
    return localAuthContext; // return useContext(AuthContext)
}; */
/*"use client"; // hmm

import { useState, createContext, useContext } from 'react';

interface ContextAuthType {
    authStatus: number;
    updateAuthStatus: React.Dispatch<React.SetStateAction<number>>;
    INVALID: number;
    AUTHENTICATED: number;
}
  
const AuthContext = createContext<ContextAuthType | undefined>(undefined);

export const AuthProvider: React.FC<any> = ({children}) => { // not sure what type
    const INVALID: number = 0; // wrong username or password filled in
    const AUTHENTICATED: number = 1; // correct details
    const [authStatus, updateAuthStatus] = useState<number>(INVALID); // actually can Boolean
  
    return (
        <AuthContext.Provider value={{authStatus, updateAuthStatus, INVALID, AUTHENTICATED}}>
            {children}
        </AuthContext.Provider>)
} */


/*
const value = { // global. Store in Object
    authStatus,
    updateAuthStatus,
    AUTHENTICATED,
    INVALID,
    }

export function useAuth() { // hook?
    return useContext(AuthContext);
}
*/

// layout.tsx // 
/*
export const metadata = {
  title: "Transcription Service",
  description: "HTX",
};*/


// midddleware.ts //
/*
import { NextRequest } from "next/server";
import { updateSession } from "./lib.ts";

export async function middleware(request: NextRequest) {
  return await updateSession(request); // always update session hmm
}
*/

// uploadFile.tsx // (for loading progres useEffect)
/*useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 0 : prevProgress + 10
    );
  }, 1000);
  return () => {
    clearInterval(timer);
  };
});*/

// lib.ts //
/*export async function decrypt(input: string): Promise<any> { // input: JSON Web Token value (encoded)
  const { payload } = await jwtVerify(input, key, { // Key to verify the JWT with
    algorithms: ["HS256"],
  });
  return payload; // payload of JWT...that means username info also?
}*/

/*export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;
  
    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
  }
  */
/*export async function getSession() { // similar to nextJS example (in app/page.tsx)
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session); // why need to decrypt?
}
*/
/* Another way of writing: 
cookies().delete("session"); ≈≈ cookies().set("session", "", { expires: new Date(0) });
// many many comments:

// payload: { user, expireTime } ≈≈ { {username: ____, password: ____} , new Date() }
export async function encrypt(payload: any) { // payload: part of transmitted data that is the actual intended message.
  return await new SignJWT(payload) // JWTPayload type...
    .setProtectedHeader({ alg: "HS256" }) // Sets the JWS Protected Header on the SignJWT object.
    .setIssuedAt() // "iat" (issued at) claim identifies the time JWT was issued
    .setExpirationTime("24 hours from now") // expiration time on or after which the JWT MUST NOT be accepted for processing. 
    .sign(key); // input key must be Uint8Array | KeyObject type; return Promise<string>
} //what keys for signing are okay w.r.t alg: https://github.com/panva/jose/issues/210#jws-alg




/* LIKELY CAN THROW AWAY */
//upload file.tsx//
// In the audio button words, maybe can:
{/*theFile ? "Reselect"  : "Audio"*/}
//event.target.files[0] = null; // this does not work friend...
 // event.preventDefault(); <-- does not work in NextJS 
  
          // Implement if got backend
          /*try { //THIS IS GETTING VERY WEIRD...
              const formData = new FormData(); // CHECK WHAT IS FormData()?  
              formData.append("file", theFile); // WHAT IS THE ENCODING LIKE FOR MULTIPART FILES?
              await fetch("http://localhost:5000/uploadfile", { 
                  method: "POST",
                  //headers: { // tell the server we're sending JSON
                    //  "Content-Type": "multipart/form-data" //multipart/form-data
                  //},
                  body: formData
                }).then(response => response.json()) // consider catching errors...
              //.then((data) => { // MUST HAVE THIS .THEN(DATA) LINE OF CODE, OTHERWISE FETCH ERROR. WHY?
                //    console.log("File uploaded successfully:", data);
                //})
              console.log("maybe maybe")
          } catch (error) {
              console.log("Error error")
          }*/
          


/* COMMENTS OR "CAN THROW, JUST DON'T WANT TO THROW YET" */
// middleware.ts //
// "return Response.redirect(new URL('/login', request.url)" ≈≈ "return NextResponse.redirect('login')"
// Another way of writing:
/*
const url = request.nextUrl.clone();
url.pathname = '/login';
return NextResponse.redirect(url);
*/
// request.nextUrl.pathname.startsWith('/upload')

/*Another way of writing for Response (JSON)
return Response.json( // return new Response(null, { status: 401 })
{ success: false, message: 'authentication failed' },
{ status: 401 })
 */

/* chunks of console.log() used:
console.log("START");
console.log("Request of type NextRequest");
console.log(request);
console.log("request url is " + request.url);
console.log('Request received:', request.nextUrl.pathname);
*/


// logout.tsx // 
/* if <button onClick={logout} did not work, will give error:
Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported*/


// login.tsx //
//"use client"; // inform nextJS this is client component; in order to import useState... 
// import Image from "next/image";
/*
"use client";

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

  useEffect(() => {
    hasAuthCookies().then(value => { hasCookies.current = value; }); // initial render got error, but put in useEffect ok. HMMM
    if (hasCookies.current == true) { router.push("/upload"); }
  })
*/



// /login.page.tsx // 
// commented: don't want main.....styles.main or styles.description
/* various drafts:
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


// upload/page.tsx //
// import Link from 'next/link';
// const session = await getSession() <--- why need to getSession()? What does it exactly mean?


// recordaudio.tsx //
// no more getMicPermission
/*
console.log("initial stream: " + stream); 
console.log("initial audioChunks: " + audioChunks); 
console.log("initial audio(url): " + audio); 
console.log("intervalRef GLOBAL: " + intervalRef.current);
*/
//mediaRecorder.current.onstop = () => { // never execute....hmm.... (if stop() was executed in pause...)
/* reference code:
const getMicPermission = async () => {
		if (permission) {
			alert("Permission already granted");
			return;
		}

		if ("MediaRecorder" in window) { // window object. Check if browser supports MediaRecorder. If yes, we access this MediaRecorder API (to eventually access microphone)
			try {       
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				}); // returns a promise that resolves successfully if the user permits access to the media.
				console.log("mediaStream imm. aft.")
				console.log(mediaStream);
				setPermission(true);
				setStream(mediaStream); // stream state variable = microphone obtained?
				// oh my so it's useState setter functions are async...?

			} catch (err) { // executed if user block the microphone
				alert(err.message); // display text in a dialog box that pops up on the screen
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};
*/

// login.module.css //
/*
.description {
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  font-size: 0.85rem;
  max-width: var(--max-width);
  width: 100%;
  z-index: 2;
  font-family: var(--font-mono);
}

.description a {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.description p {
  position: relative;
  margin: 0;
  padding: 1rem;
  background-color: rgba(var(--callout-rgb), 0.5);
  border: 1px solid rgba(var(--callout-border-rgb), 0.3);
  border-radius: var(--border-radius);
}

.code {
  font-weight: 700;
  font-family: var(--font-mono);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(25%, auto));
  max-width: 100%;
  width: var(--max-width);
}

.card {
  padding: 1rem 1.2rem;
  border-radius: var(--border-radius);
  background: rgba(var(--card-rgb), 0);
  border: 1px solid rgba(var(--card-border-rgb), 0);
  transition: background 200ms, border 200ms;
}

.card span {
  display: inline-block;
  transition: transform 200ms;
}

.card h2 {
  font-weight: 600;
  margin-bottom: 0.7rem;
}

.card p {
  margin: 0;
  opacity: 0.6;
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 30ch;
  text-wrap: balance;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 4rem 0;
}

.center::before {
  background: var(--secondary-glow);
  border-radius: 50%;
  width: 480px;
  height: 360px;
  margin-left: -400px;
}

.center::after {
  background: var(--primary-glow);
  width: 240px;
  height: 180px;
  z-index: -1;
}

.center::before,
.center::after {
  content: "";
  left: 50%;
  position: absolute;
  filter: blur(45px);
  transform: translateZ(0);
}

.logo {
  position: relative;
}
*/

/* Enable hover only on non-touch devices */
/*@media (hover: hover) and (pointer: fine) {
  .card:hover {
    background: rgba(var(--card-rgb), 0.1);
    border: 1px solid rgba(var(--card-border-rgb), 0.15);
  }

  .card:hover span {
    transform: translateX(4px);
  }
}

@media (prefers-reduced-motion) {
  .card:hover span {
    transform: none;
  }
}*/

/* Mobile */
/*@media (max-width: 700px) {
  .content {
    padding: 4rem;
  }

  .grid {
    grid-template-columns: 1fr;
    margin-bottom: 120px;
    max-width: 320px;
    text-align: center;
  }

  .card {
    padding: 1rem 2.5rem;
  }

  .card h2 {
    margin-bottom: 0.5rem;
  }

  .center {
    padding: 8rem 0 6rem;
  }

  .center::before {
    transform: none;
    height: 300px;
  }

  .description {
    font-size: 0.8rem;
  }

  .description a {
    padding: 1rem;
  }

  .description p,
  .description div {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
  }

  .description p {
    align-items: center;
    inset: 0 0 auto;
    padding: 2rem 1rem 1.4rem;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(var(--callout-border-rgb), 0.25);
    background: linear-gradient(
      to bottom,
      rgba(var(--background-start-rgb), 1),
      rgba(var(--callout-rgb), 0.5)
    );
    background-clip: padding-box;
    backdrop-filter: blur(24px);
  }

  .description div {
    align-items: flex-end;
    pointer-events: none;
    inset: auto 0 0;
    padding: 2rem;
    height: 200px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgb(var(--background-end-rgb)) 40%
    );
    z-index: 1;
  }
}*/

/* Tablet and Smaller Desktop */
/*@media (min-width: 701px) and (max-width: 1120px) {
  .grid {
    grid-template-columns: repeat(2, 50%);
  }
}

@media (prefers-color-scheme: dark) {
  .vercelLogo {
    filter: invert(1);
  }

  .logo {
    filter: invert(1) drop-shadow(0 0 0.3rem #ffffff70);
  }
}

@keyframes rotate {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}*/

// layout.tsx //
/*
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
*/

// globals.css //
/* original: 
:root {
  --max-width: 1100px;
  --border-radius: 12px;
  --font-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
    "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
    "Fira Mono", "Droid Sans Mono", "Courier New", monospace;

  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;

  --primary-glow: conic-gradient(
    from 180deg at 50% 50%,
    #16abff33 0deg,
    #0885ff33 55deg,
    #54d6ff33 120deg,
    #0071ff33 160deg,
    transparent 360deg
  );
  --secondary-glow: radial-gradient(
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );

  --tile-start-rgb: 239, 245, 249;
  --tile-end-rgb: 228, 232, 233;
  --tile-border: conic-gradient(
    #00000080,
    #00000040,
    #00000030,
    #00000020,
    #00000010,
    #00000010,
    #00000080
  );

  --callout-rgb: 238, 240, 241;
  --callout-border-rgb: 172, 175, 176;
  --card-rgb: 180, 185, 188;
  --card-border-rgb: 131, 134, 135;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;

    --primary-glow: radial-gradient(rgba(1, 65, 255, 0.4), rgba(1, 65, 255, 0));
    --secondary-glow: linear-gradient(
      to bottom right,
      rgba(1, 65, 255, 0),
      rgba(1, 65, 255, 0),
      rgba(1, 65, 255, 0.3)
    );

    --tile-start-rgb: 2, 13, 46;
    --tile-end-rgb: 2, 5, 19;
    --tile-border: conic-gradient(
      #ffffff80,
      #ffffff40,
      #ffffff30,
      #ffffff20,
      #ffffff10,
      #ffffff10,
      #ffffff80
    );

    --callout-rgb: 20, 20, 20;
    --callout-border-rgb: 108, 108, 108;
    --card-rgb: 100, 100, 100;
    --card-border-rgb: 200, 200, 200;
  }
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

a {
  color: inherit;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}
*/


// css styles for Upload //
/* .top button:
  border-radius: 5%;
  border: 1px solid;*/ /*removing this otherwise need to configure :active CSS*/
