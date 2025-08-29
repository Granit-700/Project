import { Box, Button, Typography } from "@mui/material";
import type { Category } from "../../types";

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

      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        borderRadius: "50px",
        padding: "8px 14px",
        backgroundColor: "#fff",
        border: " 1px solid #fff",
        whiteSpace: "nowrap",
        "&:hover": {
          transition: "border 0.2s ease",
          border: "1px solid #F86310",
          backgroundColor: "#fff",
        },
        "&.selected": {
          transition: "none",
          border: " 1px solid #fff",
          backgroundColor: "#FFAB08",
        }
      }}
    >
      <Box
        component="img"
        width="24px"
        height="24px"
        src={category.image}
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
        {category.name}
      </Typography>
    </Button>
  );
};

export default NavButton;
