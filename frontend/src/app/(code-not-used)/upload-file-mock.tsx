/*Attempts in detecting if browser is on mobile even if people click desktop view*/
// Idea: check whether the navigator.MaxTouchPoints is greater than 1, 
//.......and check the screen dimension (taking into account whether the screen is in portrait or landscape mode)


// info on what's to be added into (sub-pages)/upload/upload-file.tsx //
// Attempt 1: using hooks //
import { useTouchPoint, useClientMediaQuery } from "@/app/(code-not-used)/upload-hooks";

interface UploadProps {
  username: string;
  isMobileUAparse: boolean;
}

const UploadFile: React.FC<UploadProps> = (props): JSX.Element => {
  const hasSmallWidth = useClientMediaQuery('(max-width: 600px)');
  const hasSmallHeight = useClientMediaQuery('(max-height: 600px)');
  const isPortrait = useClientMediaQuery('(orientation: portrait)');
  const isLandscape = useClientMediaQuery('(orientation: landscape)');
  const canTouch = useTouchPoint();
 
  function checkMobile(isMobileUAparse: boolean, hasSmallWidth: boolean | null, hasSmallHeight:boolean | null, isPortrait: boolean | null, isLandscape: boolean | null, canTouch: boolean | null) {
    if (!hasSmallWidth || !hasSmallHeight || !isPortrait || !isLandscape || !canTouch) { throw new Error("null")}
    if (isMobileUAparse) { return true; }
    else if (canTouch && isPortrait && hasSmallWidth ) { return true; }
    else if ( canTouch && isLandscape && hasSmallHeight ) { return true; }
    else {
      return false;
    }    
  }

  const isMobileReal = checkMobile(props.isMobileUAparse, hasSmallWidth, hasSmallHeight, isPortrait, isLandscape, canTouch)

    // for checking purposes.
    console.log(hasSmallWidth);
    console.log(hasSmallHeight);
    console.log(isPortrait);
    console.log(isLandscape);
    console.log(canTouch);

  
 return (<></>) //... 

}
// issue with attempt 1: the react hooks do not work as intended.



// Attempt 2: using useEffect hook directly //
import { useState, useEffect } from "react"

// In the functional component definition, add:
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const isOrienPortrait = window.matchMedia("orientation: portrait");
    console.log("executed isOrienPortrait");
    console.log(navigator.maxTouchPoints);
    if (navigator.maxTouchPoints > 0) {
      console.log("maxTouchPoints > 0, likely touch device")

      if (isOrienPortrait.matches) {
        console.log("orienPortrait");
        console.log(isOrienPortrait);
        if (window.matchMedia("(max-width: 600px)").matches) {
          console.log("mobile portrait");
          setMatches(true);
        }
      }
      else { // assumes not null, means landscape
        console.log("orienLandscapeMaybe");
        console.log(isOrienPortrait);
        if (window.matchMedia("(max-height: 600px)").matches) {
          console.log("mobile landscape");
          setMatches(true);
        }
      }      
    }
    })
// issue with attempt 2: users will see the default interface and have to wait for a few seconds before seeing -- literally -- the content changed to update the correct design interface.
// issue with atttempt 2: not necessarily browser on mobile (esp. if it's on desktop view) is detected to be have >0 maxTouchPoints. 
