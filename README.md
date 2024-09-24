# Audio Service Web Application (Frontend)
_Last major change: 8 Aug 2024_ <br>
_Last updated: 24 Sep 2024_
---

## Overview
Created with React framework **NextJS**, using **TypeScript**. **App Router** is used for routing. <br>
[**Material UI**](https://mui.com/material-ui/getting-started/) library is utilised for the icons and design of various components used. <br>
[**jose**](https://www.npmjs.com/package/jose) is utilised as part of the authentication logic by supporting the creation and verification of JSON Web Tokens (JWT). <br>
MediaRecorder interface of the MediaStream Recording API is used to access device/browsers's microphone and enable recording functionality.<br>

This app allows users to obtain text from speech or audio by:
*  **Recording audio** live which will be sent to the backend service for processing real-time (audio streaming). The processed text will be displayed real-time.
*  **Uploading audio** files (existing files or created in the app itself, depending if browser is on mobile or desktop) which will be sent to the backend service for processing. The text will be displayed after processing. <br>

<mark>**As the backend service is not yet set-up, simulation functions are created to simulate the supposed functionality of the web application**.</mark>

## User flow
Users upon logging in at `/login` page would be directed to `/home` page. From `/home` page, users may choose to access `/record` page to record audio live or access `/upload` page to upload audio files for processing. Users can return to `/home` from `/record` or `/upload` page; and logout at `/home`, `/record` or `/upload` pages.

## Running the Application
To run the application in development mode (assuming `git clone` the repository is done): 
```
cd frontend
npm install    # run only if the relevant node_modules are not installed
npm run dev
```
In the first few lines of [`frontend/package.json`](frontend/package.json) file,   

```
"scripts": { 
    "dev": "next dev --experimental-https",
    …
}
```
dev script defined in here is `next dev --experimental-https`. This means the app is hosted on localhost via HTTP**S**, using self-signed certificate which will be generated locally when run.

**It is important to host the app on HTTPS (secure mode) if one wants to test the app on Mobile browser.** Without HTTPS, two potential issues arise when on **Mobile** browser:
*  when users go to `/record` page (and maybe `/upload` page) from `/home` page by clicking the buttons in the app, session cookie set from authentication would strangely disappear, resulting in unauthorized access being detected
* if the above did not happen and went to `/record` page, upon pressing the record button, `navigator.mediaDevices.getUserMedia() is undefined` error message will occur. This function can only be used in secure context such as HTTPS

However, if one wishes to still host the web app on HTTP, please edit the code in [`frontend/package.json`](frontend/package.json) to
```
"scripts": { 
    "dev": "next dev",
    …
}
```
Running the web app as a docker container should be possible as well. Run the docker command at root of the repository (rather than at `/frontend`). 

## Technical Details & Outstanding Issues
Details and explanation about the concept and logic behind certain code, including any outstanding issues identified but not fully resolved are detailed in **[`documentation/Technical-Documentation-8Aug.md`](documentation/Technical-Documentation-8Aug.md)**. Information includes: 
1.	Authentication & Authorisation (including the use of [`jose`](https://www.npmjs.com/package/jose) package and [`middleware.ts`](frontend/src/middleware.ts))
2.	Unable to detect when users clicked on the back button 
3.	Limitations about detecting whether devices are mobile or desktop (and why it may be important)

## Useful link of packages
* Material UI: https://mui.com/material-ui/getting-started/ 
* jose: https://www.npmjs.com/package/jose 
* UAParser.js: https://github.com/faisalman/ua-parser-js 
