import {  Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

interface ProfileProps {
  isOpen: "ProductDetails" | "Profile" | "SignIn" | "SignUp" | "TwoFA" | false;
  setIsOpen: (value: "ProductDetails" | "Profile" | "SignIn" | "SignUp" | "TwoFA" | false) => void;
}

const Profile = ({isOpen, setIsOpen}: ProfileProps) => {
  return (
    <Dialog open={Boolean(isOpen)}>
      <DialogTitle>Модалка</DialogTitle>
      <DialogContent>
        Здесь можно разместить любой контент.
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Profile;
