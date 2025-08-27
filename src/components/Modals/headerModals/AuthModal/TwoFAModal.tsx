import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react";
import { useAuthStore } from "../../../../stores/authStore";

interface TwoFAModalProps {
  isOpen: "SingIn" | "SingUp" | "TwoFA" | false;
  setIsOpen: (value: "SingIn" | "SingUp" | "TwoFA" | false) => void;
};

const TwoFAModal = ({ isOpen, setIsOpen }: TwoFAModalProps) => {

  const [code, setCode] = useState("");

  const { twoFA } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setCode(onlyNums.slice(0, 6));
  };

  const handleClick = () => {

    if (!code) return;
    if (code.length !== 6) return;

    twoFA(code)
      .then(() => setIsOpen(false)) // закроется только если код верный
      .catch(err => {
        console.log(err.message); // можно показать ошибку пользователю
      });
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
          helperText={
            code.length > 0 && code.length < 6
              ? "Введите ровно 6 цифр"
              : " "
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#FF5C00", // твой цвет рамки в фокусе
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "#FF5C00", // цвет label в фокусе
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClick}
          sx={{
            backgroundColor: "#FFAB08",
            color: "#FFFFFF",
            borderRadius: '4px',
          }}
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TwoFAModal;
