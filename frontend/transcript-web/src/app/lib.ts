/*import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { useState } from 'react';
import { useRouter } from 'next/navigation'

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  // Verify credentials && get the user
  const INCOMPLETE: number = -1; // incomplete username or password
  const INCORRECT: number = 0; // wrong username or password filled in
  const CORRECT: number = 1; // correct details

  //const {authStatus, updateAuthStatus, AUTHENTICATED, INVALID} = useAuthContext();
  //console.log(authStatus, updateAuthStatus, AUTHENTICATED, INVALID)
  const router = useRouter();
  const [username, setUsername] = useState<string>(''); // no <string> mention = type-inferred as string
  const [password, setPassword] = useState<string>('');
  const [loginStatus, updateLoginStatus] = useState<number | null>(null); // is it a good idea to use null?
    
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
      router.push('/upload')
      //console.log(INVALID);
      //console.log(AUTHENTICATED);
      //console.log(authStatus);
      //updateAuthStatus(AUTHENTICATED);
    } 
    else if (username && password) { // Incorrect login attempt
      updateLoginStatus(INCORRECT);
      console.log('Incorrect login attempt');
    }
    else if (!username || !password) { // Missing fields
      updateLoginStatus(INCOMPLETE);
    }
    
  };


  const user = { email: formData.get("email"), name: "John" };

  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
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
}*/