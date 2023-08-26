import React from "react";
import { useParams } from "react-router-dom"; 
import { Grid } from "@mui/material";
import NewsEditForm from "./formElement/NewsFormEdit";

const FormNews = () => {
  const { newsId } = useParams(); 

  return (
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        <NewsEditForm newsId={newsId} /> 
      </Grid>
    </Grid>
  );
};

export default FormNews;
