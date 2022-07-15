import * as React from "react";
import "../../assets/css/User/userStyles.css";
import Drawer from "@mui/material/Drawer";
import { CryptoState } from "../../CryptoContext";
import { Avatar } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, setDoc } from "firebase/firestore";

export default function User() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, favourites, setAlert } = CryptoState();
  let navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    signOut(auth);
    toggleDrawer();
  };

  const handleDelete = async (item) => {
    const coinRef = doc(db, "favourites", user.uid); //accessing the data from database favourites wrt user id
    try {
      await setDoc(
        coinRef,
        {
          coins: favourites.filter((favourite) => favourite !== item),
        },
        { merge: "true" }
      );
      setAlert({
        open: true,
        message: `${item} removed from your favourites`,
        type: "success",
      });
      navigate(`/`);
      return;
    } catch (error) {
      setAlert({
        open: true,
        message: `${error.message}.`,
        type: "error",
      });
      return;
    }
  };
  return (
    <div style={{ width: "7%" }}>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: "2rem",
              width: "2rem",
              cursor: "pointer",
              backgroundColor: "#eebc1d",
              marginLeft: "15%",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="container">
              <div className="user-profile">
                <Avatar
                  className="user-profile_picture"
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span className="user-profile_details">
                  {user.displayName || user.email}
                </span>
                <div className="user-favourites">
                  <h3>Favourite Cryptos</h3>
                  <div className="user-favourites_list">
                    {favourites.length === 0 ? (
                      <>
                        <h3 style={{fontSize:"20px",marginTop:"45%"}}>- No Favourites Yet -</h3>
                      </>
                    ) : (
                      <>
                        {favourites.map((item, id) => {
                          return (
                            <div
                              style={{
                                textTransform: "capitalize",
                                marginTop: "2%",
                                width: "100%",
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                                textAlign: "center",
                                justifyContent: "center",
                              }}
                            >
                              <div className="list" key={id}>
                                <span
                                  onClick={() => {
                                    navigate(`/coins/${item}`);
                                  }}
                                >
                                  {item}
                                </span>
                              </div>
                              <DeleteIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  handleDelete(item);
                                }}
                              />
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
