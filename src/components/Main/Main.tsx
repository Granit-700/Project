import { Box, Typography } from "@mui/material";
import ProductCards from "./ProductCard";
import { useEffect, useMemo } from "react";
import type { Product } from "../../types";
import { useGetProducts, useProducts } from "../../stores/mainStore";
import { useSelectedCategory } from "../../stores/navStore";

const Main = () => {
  const getProducts = useGetProducts();
  const products = useProducts();
  const selectedCategory = useSelectedCategory();

  useEffect(() => {
    getProducts(); // загружаем все продукты
  }, []);

  // 🔹 фильтруем продукты локально по выбранной категории
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(
      (product: Product) => product.category.name === selectedCategory
    );
  }, [products, selectedCategory]);

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
          {selectedCategory}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px"
          }}
        >
          {filteredProducts.map((product: Product) => (
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
