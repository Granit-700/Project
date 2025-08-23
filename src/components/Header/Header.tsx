import { AppBar, Box, Typography } from "@mui/material";
import headerBg from "../../assets/images/header_bg.png"
import headerLogo from "../../assets/icons/header_logo.svg";
import headerBurger from "../../assets/icons/header_burger.svg";

const Header = () => {
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
        height: 466
      }}
    >
      <Box component="a" href="http://localhost:5173/"
        sx={{ margin: "24px auto" }}
      >
        <Box
          component="img"
          src={headerLogo}
          alt="YourMeal"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "21px"
        }}
      >
        <Box
          sx={{
            width: 326,
            height: 326,
            padding: "26.74px 36.86px 9.31px 35.73px"
          }}
        >
          <Box
            component="img"
            src={headerBurger}
            alt="Burger"
          />
        </Box>
        <Box sx={{ maxWidth: 500 }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: "Nunito",
              fontWeight: "800",
              fontSize: "50px",
              lineHeight: "120%",
              letterSpacing: "0",
              marginBottom: "54px",
              color: "#fff"
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
                letterSpacing: 0,
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
              letterSpacing: 0,
              color: "#fff"
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
                letterSpacing: 0,
                color: "#fff"
              }}
            >
              599₽
            </Typography>
          </Typography>
        </Box>
      </Box>
    </AppBar >
  );
};

export default Header;
