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
import { useSignIn } from "../../../../stores/authStore";

interface SignInModalProps {
  isOpen: "SingIn" | "SingUp" | "TwoFA" | false;
  setIsOpen: (value: "SingIn" | "SingUp" | "TwoFA" | false) => void;
}

interface Errors {
  emailRequiredError: string | null;
  passwordRequiredError: string | null;
  passwordMinLengthError: string | null;
}

const SignInModal = ({ isOpen, setIsOpen }: SignInModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = useSignIn();

  const [errors, setErrors] = useState<Errors>({
    emailRequiredError: null,
    passwordRequiredError: null,
    passwordMinLengthError: null,
  });

  const handleClick = () => {
    const newErrors: Errors = {
      emailRequiredError: !email ? "Email обязательное поле" : null,
      passwordRequiredError: !password ? "Password обязательное поле" : null,
      passwordMinLengthError: password && password.length < 8 ? "Минимальная длина пароля 8 символов" : null,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error !== null);
    if (hasError) return;

    signIn({ email, password })
      .then((data) => {
        console.log(data.access);
        if (data.access) {
          setIsOpen(false);
        } else setIsOpen("TwoFA");
      });
  };

  return (
    <Dialog open={Boolean(isOpen)} onClose={() => setIsOpen(false)} fullWidth maxWidth="xs">
      <DialogTitle>Вход</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, emailRequiredError: null }));
            }}
            fullWidth
            error={Boolean(errors.emailRequiredError)}
            helperText={errors.emailRequiredError}
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              setErrors(prev => ({
                ...prev,
                passwordRequiredError: null,
                passwordMinLengthError: value.length >= 8 ? null : prev.passwordMinLengthError,
              }));
            }}
            fullWidth
            error={Boolean(errors.passwordRequiredError) || Boolean(errors.passwordMinLengthError)}
            helperText={errors.passwordRequiredError || errors.passwordMinLengthError}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setIsOpen(false)}
          sx={{ border: "1px solid #FFAB08", color: "#FFAB08" }}
        >
          Отмена
        </Button>
        <Button
          onClick={handleClick}
          sx={{ backgroundColor: "#FFAB08", color: "#fff" }}
        >
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignInModal;
