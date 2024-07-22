import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [snackbarList, setSnackbarList] = useState([]);

  function addSnackbar({ type, message }) {
    setSnackbarList(() => {
      return [...snackbarList, { type, message }];
    });
  }

  const removeSnackbar = (id) => {
    setSnackbarList((prev) => prev.filter((_, index) => index !== id));
  };

  return (
    <SnackbarContext.Provider value={{ addSnackbar }}>
      {children}
      {snackbarList.map(({ type, message }, index) => (
        <Snackbar
          sx={{
            marginTop: 10 * index,
          }}
          key={index}
          open={true}
          autoHideDuration={6000}
          message={message}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => removeSnackbar(index)}
            severity={type}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ))}
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  return context;
};

export { SnackbarProvider, useSnackbar };
