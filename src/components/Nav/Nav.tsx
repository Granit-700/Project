import { Container, Stack } from "@mui/material";
import NavButton from "./NavButton";
import { useEffect, useState } from "react";
import type { Category } from "../../types";
import { useCategories, useGetCategories } from "../../stores/navStore";

const Nav = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);

  const getCategories = useGetCategories();
  const categories = useCategories();
  console.log(categories);
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
        {categories && categories.map((category: Category) => (
          <NavButton
            key={category.id}
            category={category}
            isSelected={category.id === selectedCategory}
            onSelect={() => setSelectedCategory(category.id)}
          />
        ))}
      </Container>
    </Stack>
  );
};

export default Nav;
