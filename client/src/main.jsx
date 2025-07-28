import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" richColors />
    <GoogleOAuthProvider clientId="458212490870-3ksq8un9vd95sf6on4i7c60oh772gh2b.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
