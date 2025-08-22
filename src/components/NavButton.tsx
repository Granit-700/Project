import { Box, Button, Typography } from "@mui/material";
import type { Category } from "../types";
// import { Link as RouterLink } from "react-router-dom";

interface NavButtonProps {
  category: Category;
  isSelected: boolean;
  onSelect: (id: number) => void;
}


const NavButton = ({ category, isSelected, onSelect }: NavButtonProps) => {

  return (
    <Button
      disableRipple
      onClick={() => onSelect(category.id)}
      className={isSelected ? "selected" : ""}
      // это позже
      // component={RouterLink}
      // to="/"

      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        borderRadius: "50px",
        padding: "8px 14px",
        backgroundColor: "#fff",
        border: " 1px solid #fff",
        transition: "all 0.1s ease",
        whiteSpace: "nowrap",

        "&:hover": {
          border: "1px solid #F86310",
          backgroundColor: "#fff",
        },

        "&.selected": {
          border: " 1px solid #fff",
          backgroundColor: "#FFAB08",
        }
      }}
    >
      <Box
        component="img"
        src={category.icon}
      />
      <Typography
        component="span"
        sx={{
          fontFamily: "Nunito",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#000",
          textTransform: "none"
        }}
      >
        {category.title}
      </Typography>
    </Button>
  );
};

export default NavButton;
