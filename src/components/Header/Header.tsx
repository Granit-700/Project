import { AppBar, Box, Typography, Container, Button, Avatar, Menu, MenuItem } from "@mui/material";
import headerBg from "../../assets/images/header_bg.png";
import headerLogo from "../../assets/icons/header_logo.svg";
import headerBurger from "../../assets/icons/header_burger.svg";
import { useState } from "react";
import { useIsAuth, useLogOut, useUserName } from "../../stores/authStore";

interface HeaderProps {
  isOpen: "ProductDetails" | "Profile" | "SignIn" | "SignUp" | "TwoFA" | false;
  setIsOpen: (value: "ProductDetails" | "Profile" | "SignIn" | "SignUp" | "TwoFA" | false) => void;
  setTwoFAMode: (mode: "login" | "registration") => void;
}

const Header = ({ setIsOpen, setTwoFAMode }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const isAuth = useIsAuth();
  const userName = useUserName();
  const logOut = useLogOut();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: `url(${headerBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundColor: "transparent",
        boxShadow: "none",
        height: 497,
      }}
    >
      <Container disableGutters maxWidth={false} sx={{ width: "1290px" }}>
        {/* Верхняя панель: логотип + профиль / кнопки */}
        <Box
          sx={{
            margin: "24px auto",
            px: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box component="a" href="/">
            <Box component="img" src={headerLogo} alt="YourMeal" sx={{ height: 40 }} />
          </Box>

          {isAuth ? (
            <Box sx={{ position: "absolute", right: 0 }}>
              <Avatar sx={{ width: 40, height: 40, cursor: "pointer" }} onClick={handleOpen} />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={() => setIsOpen("Profile")}>Профиль</MenuItem>
                <MenuItem disabled onClick={() => { }}>Настройки</MenuItem>
                <MenuItem disabled onClick={() => { }}>Пополнить баланс</MenuItem>
                <MenuItem onClick={() => logOut()}>Выйти из аккаунта</MenuItem>
                <p style={{ textAlign: "center" }}>{userName}</p>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ position: "absolute", right: 0, display: "flex", gap: 2 }}>
              <Button
                onClick={() => { setTwoFAMode("login"); setIsOpen("SignIn"); }}
                variant="outlined"
                color="inherit"
              >
                Sign In
              </Button>
              <Button
                onClick={() => { setTwoFAMode("registration"); setIsOpen("SignUp"); }}
                variant="outlined"
                color="inherit"
                sx={{ backgroundColor: "#fff", color: "#FFAB08" }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>

        {/* Контент хедера (бургер + текст) */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "21px" }}>
          <Box sx={{ width: 326, height: 326, padding: "26.74px 36.86px 9.31px 35.73px" }}>
            <Box component="img" src={headerBurger} alt="Burger" />
          </Box>
          <Box sx={{ maxWidth: 500 }}>
            <Typography
              component="h1"
              sx={{ fontFamily: "Nunito", fontWeight: "800", fontSize: "50px", lineHeight: "120%", marginBottom: "54px", color: "#fff" }}
            >
              Только самые{" "}
              <Typography
                component="span"
                sx={{ fontFamily: "Nunito", fontWeight: 800, fontSize: "50px", lineHeight: "120%", color: "#FF5C00" }}
              >
                сочные бургеры!
              </Typography>
            </Typography>
            <Typography component="p" sx={{ fontFamily: "Nunito", fontWeight: 400, fontSize: "16px", lineHeight: "100%", color: "#fff" }}>
              Бесплатная доставка от{" "}
              <Typography component="span" sx={{ fontFamily: "Nunito", fontWeight: 600, fontSize: "16px", lineHeight: "100%", color: "#fff" }}>
                599 сом
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
