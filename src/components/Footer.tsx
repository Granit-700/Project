import { Box, Container, Typography } from "@mui/material";
import footerLogo from "../assets/icons/footer_logo.svg";
import phone from "../assets/icons/phone.svg";
import vkOrange from "../assets/icons/vk-orange.svg";
import tgOrange from "../assets/icons/tg-orange.svg";

const Footer = () => {
  return (
    <Box component="footer" >
      <Container
        disableGutters
        sx={{
          maxWidth: "1231px",
          padding: "51px 0 40px",
          display: "flex",
          flexDirection: "column",
          gap: "35px"
        }}
      >
        <Box display="flex" justifyContent={"space-between"} alignItems={"flex-start"} >
          <Box>
            <Box component="a" href="http://localhost:5173/">
              <Box
                component="img"
                src={footerLogo}
                alt="YourMeal"
              />
            </Box>
          </Box>
          <Box display="flex" gap="126px">
            <Box>
              <Typography
                component="p"
                marginBottom="24px"
                sx={{
                  fontFamily: "Nunito",
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: 0,
                  color: "#000"
                }}
              >
                Номер для заказа
              </Typography>
              <Box display="flex" gap="7px">
                <Box
                  component="img"
                  src={phone}
                  alt="Phone"
                />
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "Nunito",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "130%",
                    letterSpacing: 0,
                    color: "#000"
                  }}
                >
                  +7(930)833-38-11
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                component="p"
                paddingBottom="22px"
                sx={{
                  fontFamily: "Nunito",
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: 0,
                  color: "#000"
                }}
              >
                Мы в соцсетях
              </Typography>
              <Box display="flex" gap="16px">
                <Box component="a" href="https://vk.com" >
                  <Box
                    component="img"
                    src={vkOrange}
                    alt="vk"
                  />
                </Box>
                <Box component="a" href="https://t.me">
                  <Box
                    component="img"
                    src={tgOrange}
                    alt="tg"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="4px" >
          <Typography
            component="span"
            sx={{
              fontFamily: "Nunito",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: 0,
              color: "#000"
            }}
          >
            © YouMeal, 2022
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: "Nunito",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: 0,
              color: "#000"
            }}
          >
            Design: Anastasia Ilina
          </Typography>
        </Box>
      </Container >
    </Box >
  );
};

export default Footer;
