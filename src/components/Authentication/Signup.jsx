import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {setAlert}  = CryptoState();

  const handleSignup = async () => {
    if (email === "" || password === "" || confirmPassword === "")
    {
      setAlert({
        open:true,
        message:"Please fill all the fields correctly. All fields are mandatory.",
        type:"error"
      });
      return;
    }
    else if (password !== confirmPassword){
      setAlert({
        open:true,
        message:"Passwords are not matching. Please re-enter the correct password.",
        type:"error"
      });
      return;
    }
    else {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setAlert({
          open:true,
          message:`Signup successful. Welcome ${result.user.email}.`,
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
        <TextField
          variant="outlined"
          type="password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          required
        />
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#eebc1d" }}
          onClick={handleSignup}
        >
          Signup
        </Button>
      </Box>
    </>
  );
}
