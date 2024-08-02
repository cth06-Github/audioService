'use client'
 
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation' 

export function NavigationEvents() {
  const pathname = usePathname();
  const router = useRouter();
  
  console.log("not in the effect...")
  console.log(pathname);

  console.log("WAIT")
  const urlNow = window.location.href;
    const referrer = document.referrer;
    const compareReference: number = compareUrl(urlNow, referrer);
    
    console.log(compareReference);
    console.log(urlNow);
    console.log(referrer);

    if (compareReference < 0) { return; }

    if (urlNow.substring(compareReference) === "home" && referrer.substring(compareReference) === "record") {
      console.log("will refresh?")
      router.refresh();
    }
     
    console.log("AFTER")
    console.log(urlNow);
    console.log(referrer);
    console.log(urlNow.substring(compareReference));
    console.log(referrer.substring(compareReference));
    console.log(pathname);

  /*
  const [hasRefresh, setRefreshCount]

  if (pathname === "/home") {
     router.refresh();  
  }*/
  useEffect(() => {
    const urlNow = window.location.href;
    const referrer = document.referrer; // does not refer to the document correctly also...
    const compareReference: number = compareUrl(urlNow, referrer);
    if (compareReference < 0) { return; }

    if (urlNow.substring(compareReference) === "home" && referrer.substring(compareReference) === "record") {
      router.refresh();
    }
     
    console.log(urlNow);
    console.log(referrer);
    console.log(urlNow.substring(compareReference));
    console.log(referrer.substring(compareReference));
    console.log(pathname);

  })
  return null
}

function compareUrl(url1: string, url2: string) {
  if (url1 === url2) {
    return -1;
  }

  let urlRefLength: number;
  if (url1.length >= url2.length) {
    urlRefLength = url1.length;
  } else {
    urlRefLength = url2.length;
  }

  for (let i: number = 0; i < urlRefLength; i++) {
    if (url1[i] !== url2[i]) {
      return i;
    }
  } 
  return -1;
}