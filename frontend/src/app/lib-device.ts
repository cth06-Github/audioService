"use server"; // server action

import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export const isMobileDevice = async () => {
  // server actions are async by default

  if (typeof process === "undefined") {
    throw new Error(
      "[Server method] you are importing a server-only module outside of server"
    );
  }

  const { get } = headers();
  const ua = get("user-agent");
  const parserObj = new UAParser(ua || "");

  const device = parserObj.getDevice();

  return device.type === "mobile"; // device.type is undefined if browser is not mobile
};


