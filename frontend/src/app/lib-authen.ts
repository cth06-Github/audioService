"use server"; // server actions

import { database } from "./database-mock";
import { INVALID, VALID } from "./constants";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = "secret"; // environment variables? .env?
const key = new TextEncoder().encode(secretKey); // returns Uint8Array object

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
    secure: true,
  });
}

async function encrypt(payload: any) {
  // payload: part of transmitted data that is the actual intended message.
  return await new SignJWT(payload) // payload is JWTPayload type...
    .setProtectedHeader({ alg: "HS256" }) // Sets the JWS Protected Header on the SignJWT object.
    .setIssuedAt() // "iat" (issued at) claim: time JWT was issued
    .setExpirationTime("24 hours from now") // expiration time on or after which the JWT MUST NOT be accepted for processing.
    .sign(key); // input key must be Uint8Array | KeyObject type; return Promise<string>
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
  if (!session) return null;
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

export async function toHome() {
  console.log("run");
  redirect("/home");
}
