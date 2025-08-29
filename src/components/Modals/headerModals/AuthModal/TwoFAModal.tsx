import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react";
import { useVerifyLogin2FA, useVerifyRegistration2FA } from "../../../../stores/authStore";

interface TwoFAModalProps {
  isOpen: "ProductDetails" | "Profile" | "SignIn" | "SignUp" | "TwoFA" | false;
  setIsOpen: (value: "ProductDetails" | "Profile" | "SignIn" | "SignUp" | "TwoFA" | false) => void;
  mode: "login" | "registration" | false;
}

const TwoFAModal = ({ isOpen, setIsOpen, mode }: TwoFAModalProps) => {
  const [code, setCode] = useState("");
  const verifyLogin2FA = useVerifyLogin2FA();
  const verifyRegistration2FA = useVerifyRegistration2FA();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setCode(onlyNums.slice(0, 6));
  };

  const handleClick = async () => {
    if (!code || code.length !== 6) return;

    const fn = mode === "login" ? verifyLogin2FA : verifyRegistration2FA;

    try {
      await fn(code);
      setIsOpen(false);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <Dialog open={Boolean(isOpen)} onClose={() => setIsOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", padding: "16px 24px 0" }}>Двухфакторная аутентификация</DialogTitle>
      <DialogContent sx={{ pt: '20px !important' }}>
        <TextField
          fullWidth
          label="Код из Email"
          value={code}
          onChange={handleChange}
          variant="outlined"
          inputProps={{
            maxLength: 6,
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: { letterSpacing: "8px", textAlign: "center", fontSize: "20px" },
          }}
          error={code.length > 0 && code.length < 6}
          helperText={code.length > 0 && code.length < 6 ? "Введите ровно 6 цифр" : " "}
          sx={{
            "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "#FF5C00" } },
            "& .MuiInputLabel-root": { "&.Mui-focused": { color: "#FF5C00" } },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} sx={{ backgroundColor: "#FFAB08", color: "#FFFFFF", borderRadius: '4px' }}>Подтвердить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TwoFAModal;
