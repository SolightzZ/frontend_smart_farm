import { use, useEffect, useState } from "react";
import TableProducts from "../components/dashBoards/TableProducts";
import { Box, TextField, Typography } from "@mui/material";
import { GET, PRODUCT } from "../services/Api";

function EditProducts() {
  const [dataproducts, setDataProducts] = useState([]);

  const handleEditProducts = (dataproducts) => {
    setDataProducts(dataproducts);
  };

  const [searchProduct, setSearchProduct] = useState("");

  const filteredProducts =
    searchProduct.trim() === ""
      ? dataproducts
      : dataproducts.filter((product) =>
          product.product_name
            .toLowerCase()
            .includes(searchProduct.trim().toLowerCase()),
        );

  const isNotFound = searchProduct && filteredProducts.length === 0;

  const GetDataProduct = async () => {
    const res = await GET(PRODUCT);
    console.log("res:", res);
    try {
      if (res.success) {
        setDataProducts(res.result);
      } else {
        setDataProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetDataProduct();
  }, []);

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="ค้นหาพืช"
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
      />

      <Box mt={2}>
        {isNotFound && (
          <Typography color="error" mt={1}>
            ข้อมูลไม่ถูก โปรดกรอกชื่อพืช
          </Typography>
        )}
      </Box>
      <TableProducts
        handleEditProducts={handleEditProducts}
        dataproducts={filteredProducts}
      />
    </>
  );
}

export default EditProducts;
