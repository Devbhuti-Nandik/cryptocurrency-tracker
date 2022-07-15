import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setAlert}  = CryptoState();

  const handleLogin = async () => {
    if (email === "" || password === "")
    {
      setAlert({
        open:true,
        message:"Please fill all the fields correctly. All fields are mandatory.",
        type:"error"
      });
      return;
    }
    else {
      try {
        const result = await signInWithEmailAndPassword(auth,email, password);
        setAlert({
          open:true,
          message:`Login successful. Welcome ${result.user.email}.`,
          type:"success"
        });
        return;
      } catch (error) {
        setAlert({
          open:true,
          message:`${error.message}.`,
          type:"error"
        });
        return;
      }
    }
  };
  return (
    <>
      <Box
        p={3}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          type="password"
          label="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#eebc1d" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </>
  );
}
