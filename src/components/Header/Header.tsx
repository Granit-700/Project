import { AppBar, Box, Typography, Container, Button, Avatar, Menu, MenuItem } from "@mui/material";
import headerBg from "../../assets/images/header_bg.png";
import headerLogo from "../../assets/icons/header_logo.svg";
import headerBurger from "../../assets/icons/header_burger.svg";
import { useState } from "react";
import SignUpModal from "../Modals/headerModals/AuthModal/SignUpModal";
import SignInModal from "../Modals/headerModals/AuthModal/SignInModal";
import TwoFAModal from "../Modals/headerModals/AuthModal/TwoFAModal";
import { useIsAuth, useLogOut, useUserName } from "../../stores/authStore";
import Profile from "../Modals/headerModals/ProfileModals/ProfileModal";

const Header = () => {

  const [isOpen, setIsOpen] = useState<"Profile" | "SingIn" | "SingUp" | "TwoFA" | false>(false);


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


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

      {isOpen === "SingUp" ? <SignUpModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      {isOpen === "SingIn" ? <SignInModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      {isOpen === "TwoFA" ? <TwoFAModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      {isOpen === "Profile" ? <Profile isOpen={isOpen} setIsOpen={setIsOpen} /> : null}

      <Container
        disableGutters
        maxWidth={false}
        sx={{
          width: "1290px",
        }}
      >

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
          {/* Логотип */}
          <Box component="a" href="/">
            <Box
              component="img"
              src={headerLogo}
              alt="YourMeal"
              sx={{ height: 40 }}
            />
          </Box>

          {isAuth ? (
            <Box sx={{ position: "absolute", right: 0 }}>
              <Avatar
                sx={{ width: 40, height: 40, cursor: "pointer" }}
                onClick={handleOpen}
              />

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom", // от нижней границы аватара
                  horizontal: "right", // справа от аватара
                }}
                transformOrigin={{
                  vertical: "top", // меню будет начинаться сверху
                  horizontal: "right", // выравнивание по правому краю
                }}
              >
                <MenuItem onClick={() => { setIsOpen("Profile") }}>Профиль</MenuItem>
                <MenuItem onClick={() => { }}>Настройки</MenuItem>
                <MenuItem onClick={() => { }}>Пополнить баланс</MenuItem>
                <MenuItem onClick={() => logOut()}>Выйти из аккаунта</MenuItem>
                <p style={{ textAlign: "center" }}>{`${userName}`}</p>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ position: "absolute", right: 0, display: "flex", gap: 2 }}>
              <button onClick={() => setIsOpen("TwoFA")}>
                открыть 2FA
              </button>
              <Button
                onClick={() => setIsOpen("SingIn")}
                variant="outlined" color="inherit">
                Sign In
              </Button>
              <Button
                onClick={() => setIsOpen("SingUp")}
                variant="outlined"
                color="inherit"
                sx={{
                  backgroundColor: "#fff",
                  color: "#FFAB08",
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}

        </Box>

        {/* Контент хедера (бургер + текст) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "21px",
          }}
        >
          <Box
            sx={{
              width: 326,
              height: 326,
              padding: "26.74px 36.86px 9.31px 35.73px",
            }}
          >
            <Box component="img" src={headerBurger} alt="Burger" />
          </Box>
          <Box sx={{ maxWidth: 500 }}>
            <Typography
              component="h1"
              sx={{
                fontFamily: "Nunito",
                fontWeight: "800",
                fontSize: "50px",
                lineHeight: "120%",
                marginBottom: "54px",
                color: "#fff",
              }}
            >
              Только самые{" "}
              <Typography
                component="span"
                sx={{
                  fontFamily: "Nunito",
                  fontWeight: 800,
                  fontSize: "50px",
                  lineHeight: "120%",
                  color: "#FF5C00",
                }}
              >
                сочные бургеры!
              </Typography>
            </Typography>
            <Typography
              component="p"
              sx={{
                fontFamily: "Nunito",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "100%",
                color: "#fff",
              }}
            >
              Бесплатная доставка от{" "}
              <Typography
                component="span"
                sx={{
                  fontFamily: "Nunito",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "100%",
                  color: "#fff",
                }}
              >
                599₽
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
