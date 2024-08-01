"use client";

import React, { createContext, useState, useContext, useRef } from "react";
import { logout, toHome } from "@/app/lib-authen";

interface PopupType {
  NavPopUp: boolean;
  triggerPopup: () => void;
  clearPopup: () => void;
  handleAgreeNavPopUp: (action?: () => void) => void
  pressNav: (condition: boolean, navLocation: string, navFunc: () => void) => void
}

const PopupContext = createContext<PopupType | undefined>(undefined);

export const PopupProvider: React.FC<any> = ({ children }) => {
  // not sure what type
  const HOME = "home";
  const LOGOUT = "logout";
  const headerButtonPressed = useRef<string | undefined>();
  const [NavPopUp, setNavPopUp] = useState<boolean>(false);

  const triggerPopup = () => setNavPopUp(true); // beautify naming
  const clearPopup = () => setNavPopUp(false); // beautify naming

  const handleAgreeNavPopUp = (action?: () => void) => {
    console.log("clicked yes, navigate");
    if (action) { action(); } 
    clearPopup();
    if (headerButtonPressed.current === HOME) {
      toHome();
    } else if (headerButtonPressed.current === LOGOUT) {
      logout();
    } else {
      return;
    }
  };

  function pressNav(condition: boolean, navLocation: string, navFunc: () => void) {
    if (condition) { // recordingStatus !== INACTIVE for recording
      headerButtonPressed.current = navLocation;
      triggerPopup();
    } else navFunc();
  }
  
  return (
    <PopupContext.Provider value={{ NavPopUp, triggerPopup, clearPopup, handleAgreeNavPopUp, pressNav }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const localUserContext = useContext(PopupContext);
  if (localUserContext === undefined) {
    throw new Error("useContext must be inside a Provider");
  }
  return localUserContext; // return useContext(PopupContext)
};
