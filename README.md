# Mobile Translation App (Frontend)

### Overview
NextJS framework with Typescript. App Router is used.

### Authentication
Cookie-based Authentication is used. After users’ login credentials are verified, a JSON Web Token (JWT) containing the username information is created an assigned with a <b>session cookie<b> <br>  

The creation of JWT is assisted by the jose package used. Links to the information about the package & functions used in the code:
<li>About jose: https://github.com/panva/jose</li>
<li>jwtVerify: https://github.com/panva/jose/blob/main/docs/functions/jwt_verify.jwtVerify.md</li>
<li>signJWT: https://github.com/panva/jose/blob/HEAD/docs/classes/jwt_sign.SignJWT.md</li>

JWT is created using the secret key “secret” stored in environment variables and hashed in RSA or HSA algorithm. Both JWT token and the session cookie are set to only be valid for 24h, meaning, a user will be logged in for at most 24h or when the user clicks logout, whichever is earlier. <br> 

As it is cookie-based authentication, users who wish to hack the system could falsify a session cookie by creating and storing a session cookie through the inspect element. However, before pages which is only for logged in users to access are loaded, the value stored in the cookie sessions will be attempted to be decrypted. If the values are not in the format of a JWT, it is unable to be decrypted properly and would be deemed as unauthorized users. <br>

Hence, the risk of hackers accessing the system should be low. However, it’s still possible to hack inside if they know the secret key and the username – being able to key in the value of the cookie that is of a valid JWT format.

### Notes on Recording
MediaRecorder API is used to connect to the device’s microphone. This recording is unable to record system audio (i.e. audio played from the devices itself), it only records sounds from the surroundings.

Users are supposed to stay on the recording page in order to record. If users are to leave the page, the recording will be terminated. However, if users press <b>the back button<b> on their browsers, the current codebase is unable to detect it and terminate the recording. This is a "bug" that require looking into.

