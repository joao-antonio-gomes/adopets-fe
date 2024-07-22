import React, { createContext } from "react";

const PetsPageContext = createContext({});

export function PetsPageProvider({ children, value }) {
  return (
    <PetsPageContext.Provider value={value}>
      {children}
    </PetsPageContext.Provider>
  );
}

export function usePetsPageContext() {
  const context = React.useContext(PetsPageContext);

  if (!context) {
    throw new Error("usePetsPageContext must be used within a PetsPageContext");
  }

  return context;
}
