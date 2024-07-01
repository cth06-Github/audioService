/*copy*/
import { NextRequest } from "next/server";
import { updateSession } from "./lib.ts";

export async function middleware(request: NextRequest) {
  return await updateSession(request); // always update session hmm
}