"use client";

import React from "react";
import { SnackbarProvider } from "@/contexts/snackbar";

function Providers({ children }) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}

export default Providers;
