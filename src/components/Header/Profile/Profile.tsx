import {  Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

interface ProfileProps {
  isOpen: "Profile" | "SingIn" | "SingUp" | "TwoFA" | false;
  setIsOpen: (value: "Profile" | "SingIn" | "SingUp" | "TwoFA" | false) => void;
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
