import { Box, Typography } from "@mui/material";
import ProductCards from "./ProductCard";
import { useEffect } from "react";
import type { Product } from "../../types";
import { useGetProducts, useProducts } from "../../stores/mainStore";

const Main = () => {
  const getProducts = useGetProducts();
  const products = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box component="main">
      <Box component="section">
        <Typography
          component="h2"
          sx={{
            fontFamily: "Nunito",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "120%",
            letterSpacing: 0,
            marginBottom: "24px"
          }}
        >
          {"Бургеры"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px"
          }}
        >
          {products.map((product: Product) => (
            <ProductCards
              key={product.id}
              product={product}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
