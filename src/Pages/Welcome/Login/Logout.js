import React, { useState } from "react";
import { useFirebaseApp } from "reactfire";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import "firebase/auth";

const Logout = () => {
  const firebase = useFirebaseApp();
  const handleLogout = () => {
    setOpen(false);
    firebase.auth().signOut();
  };
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        style={{ marginLeft: "20px" }}
        onClick={() => {
          setOpen(true);
        }}
        variant="outlined"
        color="primary"
      >
        Log Out
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>Are you sure you want to logout? </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Logout;
