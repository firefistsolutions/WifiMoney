"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import EnrollModal from "./EnrollModal";

type EnrollModalContextType = {
  openModal: (title?: string) => void;
  closeModal: () => void;
  isOpen: boolean;
};

const EnrollModalContext = createContext<EnrollModalContextType | undefined>(undefined);

export function EnrollModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Get Started");

  const openModal = (title?: string) => {
    if (title) setModalTitle(title);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <EnrollModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <EnrollModal isOpen={isOpen} onClose={closeModal} title={modalTitle} />
    </EnrollModalContext.Provider>
  );
}

export function useEnrollModal() {
  const context = useContext(EnrollModalContext);
  if (context === undefined) {
    throw new Error("useEnrollModal must be used within an EnrollModalProvider");
  }
  return context;
}

