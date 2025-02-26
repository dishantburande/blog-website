import styled from "@emotion/styled";
import { AppBar, Toolbar } from "@mui/material";
// import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Component = styled(AppBar)`
  background: #ffffff;
  color: #000;
`;

const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
  }
`;
const Header = () => {
  return (
    <Component>
      <Container>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/logout">LOGOUT</Link>
      </Container>
    </Component>
  );
};

export default Header;
