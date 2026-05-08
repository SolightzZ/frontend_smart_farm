import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

function TableProducts({ handleEditProducts, dataproducts }) {
  return (
    <Box>
      {console.log("handleEditProducts:", handleEditProducts)}
      {console.log("dataproducts:", dataproducts)}
      <Grid container spacing={2}>
        {dataproducts?.map((i) => (
          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardMedia sx={{ height: 140 }} image={i.image} />
              <CardContent>
                <Typography>ชื่อพืช : {i.product_name} </Typography>
                <Typography>ไร่ : {i.quantity}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}>
                  <Chip
                    label={`จํานวน : ${i.quantity}`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TableProducts;
