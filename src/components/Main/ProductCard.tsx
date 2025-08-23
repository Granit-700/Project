import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import type { Product } from "../../types";

interface ProductCardsProps {
  product: Pick<Product, "id" | "image" | "original_price" | "name" | "grams">
}

const ProductCards = ({ product }: ProductCardsProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        padding: "12px",
        borderRadius: "18px"
      }}>
      <CardMedia
        component="img"
        src={product.image}
        alt="burger1"
        sx={{
          width: "276px",
          height: "220px",
          borderRadius: "12px",
        }}
      />
      <CardContent
        sx={{
          padding: "16px 0 8px"
        }}>
        <Typography component="p"
          sx={{
            fontFamily: "Nunito",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: 0,
            marginBottom: "8px",
            color: "#000"
          }}>
          {product.original_price + "₽"}
        </Typography>
        <Typography component="h3"
          sx={{
            fontFamily: "Nunito",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "130%",
            letterSpacing: 0,
            color: "#000",
            marginBottom: "29px"
          }}>
          {product.name}
        </Typography>
        <Typography component="span"
          sx={{
            fontFamily: "Nunito",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "130%",
            letterSpacing: 0,
            color: "#B1B1B1",
          }}>
          {product.grams + "г"}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: 0
        }}>
        <Button
          disableRipple
          sx={{
            backgroundColor: "#F2F2F3",
            borderRadius: "12px",
            width: "100%",
            padding: "12px 0",
            textTransform: "none",
            fontFamily: "Nunito",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: 0,
            color: "#000",
            transition: "all 0.1s ease",
            "&:hover": {
              transition: "all 0.1s ease",
              color: "#fff",
              backgroundColor: "#F86310",
            },
          }}>
          Добавить
        </Button>
      </CardActions>
    </Card >
  );
};

export default ProductCards;
