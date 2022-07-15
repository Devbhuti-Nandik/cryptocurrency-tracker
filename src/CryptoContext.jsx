import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";

const Crypto = createContext();

export default function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("Rs.");
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "favourites", user.uid);
      let unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) setFavourites(coin.data().coins);
        else console.log("No favourites yet.");
      });
      return()=>{
        unsubscribe();
      }
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (validUser) => {
      if (validUser) setUser(validUser);
      else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (currency === "INR") setSymbol("Rs.");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        user,
        alert,
        setAlert,
        favourites,
      }}
    >
      {children}
    </Crypto.Provider>
  );
}

export const CryptoState = () => {
  return useContext(Crypto);
};
