import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled
} from "@mui/material";
import { Link,  useSearchParams } from "react-router-dom";
import React from "react";
import { categories } from "../../../constants/data.js";

const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #6495ed;
  color: #fff;
  text-decoration: none;
`;

const StyleLink = styled(Link)`
text-decoration: none;
color: inherit;
`
const Categories = () => {

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');


  return (
    <>
    <StyleLink to ={`/create?category=${category || ''}`}>
      <StyledButton variant="contained"> Create Blog</StyledButton>
    </StyleLink>

      <StyledTable>
        <TableHead>
          <TableRow>
            <StyleLink to='/'>
            <TableCell>All Categories</TableCell>
            </StyleLink>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyleLink to={`/?category=${category.type}`}>
                {category.type}
                </StyleLink>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
