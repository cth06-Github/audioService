/*
'use server'
import { redirect } from 'next/navigation';
//import { login } from "../lib.ts";
import {database} from '../frontend/src/app/database-mock';
import { EMPTY, INVALID, VALID } from '../frontend/src/app/constants';


export async function submitForm(formData: any) { // should not be any...
    //const toReturn = await login(formData);
    //redirect("/login"); // remember to change to /upload
    console.log(formData);
    //console.log("toReturn" + toReturn);
    //return toReturn;
}

// consider putting it back to login page
function verify(userInput: string, passwordInput: string) {
    const filtered = database.filter(accounts => accounts.username === userInput && accounts.password === passwordInput)
    console.log(filtered);
    const authStatus: number = filtered.length !== 0 ? VALID : INVALID;
    console.log(authStatus)
    return authStatus;
  }
 
export async function authenticate(_currentState: unknown, formData: FormData) {
    const userInput = formData.get("username")?.toString();
    const passwordInput = formData.get("password")?.toString();
    if ((!userInput) || (!passwordInput)) {
        return EMPTY;
    }
    const isAuthenticated = verify(userInput, passwordInput);

    // cookies??
    if (isAuthenticated === VALID) {
        redirect("/upload");
    }

    return isAuthenticated;
}
*/

  