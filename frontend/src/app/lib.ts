"use server"; // SO THAT WAS THE SOLUTION?

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {database} from './database-mock';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuthContext } from './context/authcontext' 
import { EMPTY, INVALID, VALID } from './constants';


const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}


function verify(userInput: string, passwordInput: string) {
  const filtered = database.filter(accounts => accounts.username === userInput && accounts.password === passwordInput)
  console.log(filtered);
  const authStatus: number = filtered.length !== 0 ? VALID : INVALID;
  console.log(authStatus)
  return authStatus;
}

export async function authenticate(_currentState: number | null,  formData: FormData) {
  const userInput = formData.get("username")?.toString();
  const passwordInput = formData.get("password")?.toString();
  if ((!userInput) || (!passwordInput)) {
      return EMPTY;
  }
  const isAuthenticated = verify(userInput, passwordInput);

  // If authenticated, set cookies??
  if (isAuthenticated === VALID) {
    const user = { username: userInput, password: passwordInput};
    console.log(user);

    // Create the session
    const expires = new Date(Date.now() + 30 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true }); // can also have max age...check the cookies documentation?
    redirect("/upload"); // change to "upload" when done
  }
  return isAuthenticated;
}

export async function logout1() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  //redirect('/login');
}

export async function getSession() { // similar to nextJS example (in app/page.tsx)
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function hasAuthCookies() {
  const authCookies = await cookies().get("session");
  console.log("what" + authCookies);
  return authCookies !== undefined;
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
}
