import { Box, Container } from "@mui/material";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
};


const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Nav />
      <Box>
        <Container
          disableGutters maxWidth={false}
          sx={{ display: "flex", maxWidth: "1290px" }}
        >
          <SideBar />
          {children}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
