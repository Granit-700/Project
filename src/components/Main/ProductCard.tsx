import { Button, Card, CardActions, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
import type { Product } from "../../types";
import { useAddToCart } from "../../stores/cartStore";

interface ProductCardsProps {
  setIsOpen: (value: "ProductDetails" | "Profile" | "SignIn" | "SignUp" | "TwoFA" | false) => void;
  product: Product;
  setSelectedProduct: (product: Product | null) => void;
}

const ProductCards = ({ setIsOpen, product, setSelectedProduct }: ProductCardsProps) => {
  const addToCart = useAddToCart();

  return (
    <Card elevation={0} sx={{ p: "12px", borderRadius: "18px" }}>
      <CardActionArea
        disableRipple
        onClick={() => {
          setSelectedProduct(product)
          setIsOpen("ProductDetails");
        }}
        sx={{ borderRadius: "12px", cursor: "pointer" }}
      >
        <CardMedia
          component="img"
          src={product.image}
          alt={product.name}
          sx={{ width: 276, height: 220, borderRadius: "12px" }}
        />
        <CardContent sx={{ p: "16px 0 8px" }}>
          <Typography component="p" sx={{ fontFamily: "Nunito", fontWeight: 600, fontSize: 24, mb: "8px", color: "#000" }}>
            {product.original_price} сом
          </Typography>
          <Typography component="h3" sx={{ fontFamily: "Nunito", fontWeight: 400, fontSize: 16, lineHeight: "130%", color: "#000", mb: "29px" }}>
            {product.name}
          </Typography>
          <Typography component="span" sx={{ fontFamily: "Nunito", fontWeight: 600, fontSize: 16, lineHeight: "130%", color: "#B1B1B1" }}>
            {product.grams}г
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ p: 0, mt: "8px" }}>
        <Button
          disableRipple
          sx={{
            backgroundColor: "#F2F2F3",
            borderRadius: "12px",
            width: "100%",
            p: "12px 0",
            textTransform: "none",
            fontFamily: "Nunito",
            fontWeight: 400,
            fontSize: 16,
            color: "#000",
            transition: "all 0.1s ease",
            "&:hover": { color: "#fff", backgroundColor: "#F86310" },
          }}
          onClick={(e) => {
            e.stopPropagation(); // чтобы не открывалась модалка
            addToCart(product.id, 1);
          }}
        >
          Добавить
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCards;
