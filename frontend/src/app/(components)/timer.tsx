/*"use client";


import { useState, useEffect, useRef } from "react";  

interface TimerProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
  onDisagree: () => void;
}

const PopUp: React.FC<TimerProps> = (props): JSX.Element => {

const [time, updateTiming] = useState(0); // hooks cannot be exported
const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined); // cannot null because clearInterval cannot null
const startTimeRef = useRef(0);
const [running, setRunning] = useState(false);

const startTiming = () => {
  // Date.now(): miliseoncds elapsed since epoch (1 Jan 1970, UTC 0000h)
  startTimeRef.current = Date.now() - 10; // Reference Time when timing started. Assumes 10 ms lag in code runtime
  intervalRef.current = setInterval(() => {
    updateTiming(
      Math.floor((Date.now() - startTimeRef.current) / 1000) + time
    ); // divide by 1000 for ms to second
  }, 1000); // Math.floor(): round down
  setRunning(true);
};

const pauseTiming = () => {
  clearInterval(intervalRef.current); // stops the function excution defined in setInterval(): setTime()
  setRunning(false);
};

const stopTiming = () => {
  clearInterval(intervalRef.current);
  updateTiming(0);
  setRunning(false);
};

const timeInHourMinSec = (timing: number) => {
  const hours = Math.floor(timing / 3600);
  const minutes = Math.floor((timing % 3600) / 60);
  const seconds = (timing % 3600) % 60;
  const timeInMinSec =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  return hours > 0
    ? hours.toString().padStart(2, "0") + ":" + timeInMinSec
    : timeInMinSec;
};

useEffect(() => {
  if (running) { // running
    startTiming();
  }
  return () => {
    clearInterval(intervalRef.current); //intervalRef.current
  };
}, [running]);

return (
  <p style={{ margin: "0px 2px" }}>{timeInHourMinSec(time)}</p>
)

}
*/