'use client';

import { Dispatch, ReactNode, SetStateAction, useState, createContext } from "react";

interface ContextValue {
  openHamburgerMenu: boolean;
  setOpenHamburgerMenu: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: ContextValue = {
  openHamburgerMenu: false,
  setOpenHamburgerMenu: () => {},
};

export const GlobalStateContext = createContext<ContextValue>(defaultValue);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
   const [openHamburgerMenu, setOpenHamburgerMenu] = useState<boolean>(false)

  const contextValue: ContextValue = {
    openHamburgerMenu,
    setOpenHamburgerMenu
  };

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};
