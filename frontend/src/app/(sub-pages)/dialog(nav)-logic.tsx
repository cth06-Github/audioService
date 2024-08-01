"use client";

import React, { createContext, useState, useContext, useRef } from "react";
import { logout, toHome } from "@/app/lib-authen";

interface NavDialogType {
  navDialog: boolean;
  triggerNavDialog: () => void;
  clearNavDialog: () => void;
  agreeNavDialogAction: (preAction?: () => void) => void;
  navCheck: (
    condition: boolean,
    navDestination: string,
    navFunc: () => void
  ) => void;
}

const NavDialogContext = createContext<NavDialogType | undefined>(undefined);

export const NavDialogProvider: React.FC<any> = ({ children }) => {
  // not sure what type
  const HOME = "home";
  const LOGOUT = "logout";

  const headerButtonPressed = useRef<string | undefined>();
  const [navDialog, setNavDialog] = useState<boolean>(false);
  const triggerNavDialog = () => setNavDialog(true); // beautify naming
  const clearNavDialog = () => setNavDialog(false); // beautify naming

  const agreeNavDialogAction = (preAction?: () => void) => {
    console.log("clicked yes, navigate");
    if (preAction) {
      preAction();
    }
    clearNavDialog();
    if (headerButtonPressed.current === HOME) {
      toHome();
    } else if (headerButtonPressed.current === LOGOUT) {
      logout();
    } else {
      return;
    }
  };

  function navCheck(
    condition: boolean,
    navDestination: string,
    navFunc: () => void
  ) {
    if (condition) {
      headerButtonPressed.current = navDestination;
      triggerNavDialog();
    } else navFunc();
  }

  return (
    <NavDialogContext.Provider
      value={{
        navDialog,
        triggerNavDialog,
        clearNavDialog,
        agreeNavDialogAction,
        navCheck
      }}
    >
      {children}
    </NavDialogContext.Provider>
  );
};

export const useNavDialog = () => {
  const localContext = useContext(NavDialogContext);
  if (localContext === undefined) {
    throw new Error("useContext must be inside a Provider");
  }
  return localContext;
};
