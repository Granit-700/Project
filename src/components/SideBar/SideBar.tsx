import { Box, Typography } from "@mui/material";

const SideBar = () => {
  return (
    <Box
      width="300px"
      margin="72px 30px 0 0"
      sx={{ backgroundColor: "#fff" }}>
      {false ? (
        ""
      ) : (
        <Box padding="24px 16px" borderRadius="18px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="16px">
            <Typography component="h3"
              sx={{ fontWeight: 600, fontSize: "24px", letterSpacing: 0, color: "#000" }}
            >
              Корзина
            </Typography>
            <Box
              width="40px"
              height="20px"
              textAlign="center"
              paddingY="2px"
              marginY="2px"
              borderRadius="6px"
              sx={{ backgroundColor: "#F2F2F3", fontFamily: "Nunito", fontSize: "12px" }}
            >
              0
            </Box>
          </Box>
          <Typography>{"Тут пока пусто :("}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SideBar;
