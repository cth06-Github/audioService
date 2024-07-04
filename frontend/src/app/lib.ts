"use server"; // server actions (the solution)

import { database } from "./database-mock";
import { INVALID, VALID } from "./constants";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = "secret"; // should we try environment variables?
const key = new TextEncoder().encode(secretKey); // encode() ---> ASCII codepoint

export async function authenticate(
  _currentState: string | null,
  formData: FormData
) {
  const userInput = formData.get("username")?.toString();
  const passwordInput = formData.get("password")?.toString();
  if (!userInput || !passwordInput) {
    return "Please fill in your Username or Password.";
  }
  const authStatus = verify(userInput, passwordInput);

  if (authStatus === VALID) {
    cookieSetter({ username: userInput }); // set cookies only if authenticated
    redirect("/home");
  } else {
    return "Incorrect Username and Password.";
  }
}

function verify(userInput: string, passwordInput: string) {
  const filtered = database.filter(
    (accounts) =>
      accounts.username === userInput && accounts.password === passwordInput
  );
  return filtered.length !== 0 ? VALID : INVALID;
}

async function cookieSetter(user: object) {
  // create session cookies
  // Create the session
  const ONEDAY = 24 * 60 * 60 * 1000; // 24h in miliseconds
  const expireTime = new Date(Date.now() + ONEDAY); // set for one day instead of "when browser is closed"
  const session = await encrypt({ user, expireTime });

  // Save the session in a cookie.
  cookies().set("session", session, {
    expires: expireTime,
    httpOnly: true,
    secure: true,
  }); // name, value, options
}

// got encrypt, but decrypt function not defined
async function encrypt(payload: any) {
  // payload: part of transmitted data that is the actual intended message.
  return await new SignJWT(payload) // payload is JWTPayload type...
    .setProtectedHeader({ alg: "HS256" }) // Sets the JWS Protected Header on the SignJWT object.
    .setIssuedAt() // "iat" (issued at) claim: time JWT was issued
    .setExpirationTime("24 hours from now") // expiration time on or after which the JWT MUST NOT be accepted for processing.
    .sign(key); // input key must be Uint8Array | KeyObject type; return Promise<string>
}

export async function logout() {
  // Destroy the session
  cookies().delete("session"); // cookies().set("session", "", { expires: new Date(0) });
  redirect("/login");
}
