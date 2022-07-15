import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { CryptoState } from "../CryptoContext";

export default function AlertCustom() {
  const { alert, setAlert } = CryptoState();
  const handleClose = () => {
    setAlert({open:false});
  };
  return (
    <>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}
