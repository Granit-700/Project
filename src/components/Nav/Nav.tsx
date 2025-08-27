import { Container, Stack } from "@mui/material";
import NavButton from "./NavButton";
import { useEffect } from "react";
import type { Category } from "../../types";
import { useCategories, useGetCategories, useSelectedCategory, useSetSelectedCategory } from "../../stores/navStore";

const Nav = () => {
  const getCategories = useGetCategories();
  const categories = useCategories();
  const selectedCategory = useSelectedCategory();
  const setSelectedCategory = useSetSelectedCategory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Stack margin="40px 0 50px">
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          gap: "24px",
          maxWidth: "1290px"
        }}
      >
        {categories.map((category: Category) => (
          <NavButton
            key={category.id}
            category={category}
            isSelected={category.name === selectedCategory}
            onSelect={() => setSelectedCategory(category.name)}
          />
        ))}
      </Container>
    </Stack>
  );
};

export default Nav;
