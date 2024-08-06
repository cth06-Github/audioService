"use server"; // server actions

import { database } from "./mock-data";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Generating key for JWT, code to be put elsewhere in future
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey); // returns Uint8Array object

// Authentication Status code
const INVALID = 0;
const VALID = 1;

export async function authenticate(
  _currentState: string | null,
  formData: FormData // obtained from <form> in login page
) {
  const userInput = formData.get("username")?.toString();
  const passwordInput = formData.get("password")?.toString();
  if (!userInput || !passwordInput) {
    return "Please fill in your Username or Password.";
  }
  const authStatus = verify(userInput, passwordInput); // verify if users are valid

  if (authStatus === VALID) {
    cookieSetter({ username: userInput }); // create session cookies only if authenticated
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
  // Create the session
  const ONEDAY = 24 * 60 * 60 * 1000; // 24h in miliseconds
  const expireTime = new Date(Date.now() + ONEDAY); // expiry set for 1 day instead of when browser is closed
  const session = await encrypt({ user, expireTime });

  // Save the session in a cookie, .set(name, value, options)
  cookies().set("session", session, {
    expires: expireTime,
    httpOnly: true,
    secure: true, // secure=true cookies does not work in browsers on mobile browser without HTTPS
  });
}

async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Sets the JWS Protected Header on the SignJWT object.
    .setIssuedAt() // set the current? time JWT was issued (iat (issued at) claim)
    .setExpirationTime("24 hours from now") // expiry time after which JWT must NOT be accepted for processing.
    .sign(key); // parameter key must be Uint8Array | KeyObject type; return Promise<string>
}

export async function decrypt(input: string): Promise<any> {
  // input: JSON Web Token value (encoded)

  const { payload } = await jwtVerify(input, key, {
    // Key to verify the JWT with
    algorithms: ["HS256"],
  });
  console.log(payload);
  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) {
    return null;
  }
  return await decrypt(session);
}

export async function getUsername() {
  const decrypted = await getSession();
  return decrypted.user.username;
}

export async function logout() {
  cookies().delete("session"); // Destroy the session
  redirect("/login");
}
