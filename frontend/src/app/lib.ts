"use server"; // SO THAT WAS THE SOLUTION?

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {database} from './database-mock';
import { redirect } from 'next/navigation';
import { EMPTY, INVALID, VALID } from './constants';


const secretKey = "secret"; // bad idea? can try environmental variables apparently?
const key = new TextEncoder().encode(secretKey); // encode() ---> ASCII codepoint

// payload: { user, expireTime } ≈≈ { {username: ____, password: ____} , new Date() }
export async function encrypt(payload: any) { // payload: part of transmitted data that is the actual intended message.
  return await new SignJWT(payload) // JWTPayload type...
    .setProtectedHeader({ alg: "HS256" }) // Sets the JWS Protected Header on the SignJWT object.
    .setIssuedAt() // "iat" (issued at) claim identifies the time JWT was issued
    .setExpirationTime("24 hours from now") // expiration time on or after which the JWT MUST NOT be accepted for processing. 
    .sign(key); // input key must be Uint8Array | KeyObject type; return Promise<string>
} //what keys for signing are okay w.r.t alg: https://github.com/panva/jose/issues/210#jws-alg

export async function decrypt(input: string): Promise<any> { // input: JSON Web Token value (encoded)
  const { payload } = await jwtVerify(input, key, { // Key to verify the JWT with
    algorithms: ["HS256"],
  });
  return payload; // payload of JWT...that means username info also?
}


function verify(userInput: string, passwordInput: string) {
  const filtered = database.filter(accounts => accounts.username === userInput && accounts.password === passwordInput)
  const authStatus: number = filtered.length !== 0 ? VALID : INVALID;
  return authStatus;
}

export async function authenticate(_currentState: number | null,  formData: FormData) {
  // User Verification
  const userInput = formData.get("username")?.toString();
  const passwordInput = formData.get("password")?.toString();
  if ((!userInput) || (!passwordInput)) {
      return EMPTY;
  }
  const isAuthenticated = verify(userInput, passwordInput);

  // If authenticated, set cookies
  if (isAuthenticated === VALID) {
    const user = { username: userInput, password: passwordInput};
    console.log(user);

    // Create the session
    const ONEDAY = 24 * 60 * 60 * 1000; // 24h in miliseconds 
    const expireTime = new Date(Date.now() + ONEDAY); // set for one day
    const session = await encrypt({ user, expireTime });

    // Save the session in a cookie. [login details: persistent cookie?]
    cookies().set("session", session, { expires: expireTime, httpOnly: true, secure: true}); // name, value, options
    redirect("/upload"); 
  }

  return isAuthenticated;
}

export async function logout() { // Destroy the session
  cookies().delete("session"); // cookies().set("session", "", { expires: new Date(0) });
  redirect('/login');   
}

export async function getSession() { // similar to nextJS example (in app/page.tsx)
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session); // why need to decrypt?
}
// const authCookies = await cookies().get("session"); 
// if (authCookies !== undefined) { redirect("/upload"); }

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
}
