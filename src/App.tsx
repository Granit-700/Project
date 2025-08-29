import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout/Layout";
import Main from "./components/Main/Main";
import { useState } from "react";
import SignUpModal from "./components/Modals/headerModals/AuthModal/SignUpModal";
import SignInModal from "./components/Modals/headerModals/AuthModal/SignInModal";
import TwoFAModal from "./components/Modals/headerModals/AuthModal/TwoFAModal";
import Profile from "./components/Modals/headerModals/ProfileModal/ProfileModal";
import ProductDetailModal from "./components/Modals/ProductDetailsModals/ProductDetailModal";
import type { Product } from "./types";

const theme = createTheme({ typography: { fontFamily: "Nunito" } });

function App() {
  const [isOpen, setIsOpen] = useState<
    "ProductDetails" |
    "Profile" |
    "SignIn" |
    "SignUp" |
    "TwoFA" |
    false
  >(false);
  const [mode, setTwoFAMode] = useState<"login" | "registration" | false>(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      {isOpen === "SignUp" ? <SignUpModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      {isOpen === "SignIn" ? <SignInModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      {isOpen === "TwoFA" ? <TwoFAModal mode={mode} isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      {isOpen === "Profile" ? <Profile isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      {isOpen === "ProductDetails" ? <ProductDetailModal isOpen={isOpen} setIsOpen={setIsOpen} product={selectedProduct} setSelectedProduct={setSelectedProduct} /> : null}
      <ThemeProvider theme={theme}>
        <Layout setTwoFAMode={setTwoFAMode} isOpen={isOpen} setIsOpen={setIsOpen}>
          <Main setIsOpen={setIsOpen} setSelectedProduct={setSelectedProduct} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
