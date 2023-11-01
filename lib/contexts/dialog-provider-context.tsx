"use client";
import { createContext, useCallback, useContext, useState } from "react";

const ModalContext = createContext({ openDialog: () => {}, closeDialog: () => {} });

export const DialogProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const openDialog = useCallback(() => {}, []);

  const closeDialog = useCallback(() => {}, []);

  return <ModalContext.Provider value={{ openDialog, closeDialog }}>{children}</ModalContext.Provider>;
};

export const useDialog = () => {
  return useContext(ModalContext);
};
