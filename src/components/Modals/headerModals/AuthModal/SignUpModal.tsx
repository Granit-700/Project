import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useSignUp } from "../../../../stores/authStore";

interface SignUpModalProps {
  isOpen: "SingIn" | "SingUp" | "TwoFA" | false;
  setIsOpen: (value: "SingIn" | "SingUp" | "TwoFA" | false) => void;
};

interface Errors {
  usernameRequiredError: string | null;
  emailRequiredError: string | null;
  passwordRequiredError: string | null;
  passwordMinLengthError: string | null;
  confirmPasswordRequiredError: string | null;
  confirmPasswordMinLengthError: string | null;
  confirmPasswordError: string | null;
};

const SignUpModal = ({ isOpen, setIsOpen }: SignUpModalProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const signUp = useSignUp();
  
  const [errors, setErrors] = useState<Errors>({
    usernameRequiredError: null,
    emailRequiredError: null,
    passwordRequiredError: null,
    passwordMinLengthError: null,
    confirmPasswordRequiredError: null,
    confirmPasswordMinLengthError: null,
    confirmPasswordError: null,
  });
  
  const handleClick = () => {
    const newErrors = {
      usernameRequiredError: !username ? "Username обязательное поле" : null,
      emailRequiredError: !email ? "Email обязательное поле" : null,
      passwordRequiredError: !password ? "Password обязательное поле" : null,
      passwordMinLengthError: password.length < 8 ? "Минимальная длина пароля 8 символов" : null,
      confirmPasswordRequiredError: !confirmPassword ? "ConfirmPassword обязательное поле" : null,
      confirmPasswordMinLengthError: confirmPassword.length < 8 ? "Минимальная длина пароля 8 символов" : null,
      confirmPasswordError: password && confirmPassword && password !== confirmPassword ? "Пароли не совпадают" : null
    };
    
    setErrors(newErrors);
    
    const hasError = Object.values(newErrors).some(error => error !== null);
    if (hasError) return;
    
    signUp({ username, email, password }).then(() => setIsOpen("TwoFA"));
  };

  return (
    <Dialog
      open={Boolean(isOpen)}
      onClose={() => setIsOpen(false)}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Регистрация</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setErrors(prev => ({ ...prev, usernameRequiredError: null }));
            }}
            fullWidth
            error={Boolean(errors.usernameRequiredError)}
            helperText={errors.usernameRequiredError}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors(prev => ({ ...prev, emailRequiredError: null }));
            }}
            fullWidth
            error={Boolean(errors.emailRequiredError)}
            helperText={errors.emailRequiredError}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              setErrors(prev => ({
                ...prev,
                passwordRequiredError: null,
                passwordMinLengthError: value.length >= 8 ? null : prev.passwordMinLengthError
              }));
            }}
            fullWidth
            error={Boolean(errors.passwordRequiredError) || Boolean(errors.passwordMinLengthError)}
            helperText={errors.passwordRequiredError || errors.passwordMinLengthError}
          />
          <TextField
            label="Confirm password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => {
              const value = e.target.value;
              setConfirmPassword(value);
              setErrors(prev => ({
                ...prev,
                confirmPasswordRequiredError: null,
                confirmPasswordMinLengthError: value.length >= 8 ? null : prev.confirmPasswordMinLengthError,
                confirmPasswordError: null
              }));
            }}
            fullWidth
            error={Boolean(errors.confirmPasswordRequiredError) || Boolean(errors.confirmPasswordMinLengthError) || Boolean(errors.confirmPasswordError)}
            helperText={errors.confirmPasswordRequiredError || errors.confirmPasswordMinLengthError || errors.confirmPasswordError}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setIsOpen(false)}
          sx={{
            border: "1px solid #FFAB08",
            color: "#FFAB08"
          }}
        >
          Отмена
        </Button>
        <Button
          onClick={handleClick}
          sx={{
            backgroundColor: "#FFAB08",
            color: "#fff"
          }}
        >
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignUpModal;
