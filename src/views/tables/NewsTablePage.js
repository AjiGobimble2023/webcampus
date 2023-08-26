import React, { useState, useEffect } from "react";
import { Card, CardContent, Box, Typography, Button, TextField,Pagination } from "@mui/material";
import ListNewsTable from "../dashboards/dashboard1-components/NewsTable";

const NewsTable = () => {
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isdelete, setIsdelete]= useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      fetchNewsData();
    }, 500);

    return () => clearTimeout(delayTimeout); 
  }, [page, search,isdelete]);

  const fetchNewsData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/news?page=${page}&search=${search}`);
      const data = await response.json();
      setNewsData(data['data']);
      setTotalPage(data['totalPages'])
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };
  const handelAdd=()=>{
    window.location = '/#/form-layouts/form-news'
  }
  const handleDeleteNews=()=>{
    setIsdelete(!isdelete);
  }

  return (
    <Box>
      <Card variant="outlined">
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">Data Berita</Typography>
          <Button variant="outlined" color="primary" onClick={handelAdd}>
            Tambah Data
          </Button>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
            maxWidth: 300,
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearchChange}
            fullWidth
          />
        </Box>

        <Box
          sx={{
            overflow: {
              xs: "auto",
              sm: "unset",
            },
          }}
        >
          <ListNewsTable News={newsData} onDeleteNews={handleDeleteNews}/>
        </Box>
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Pagination
          count={totalPages} 
          page={page}
          onChange={(event, page) => setPage(page)}
          variant="outlined"
          color="primary"
        />
      </Box>
      </Card>
    </Box>
  );
};

export default NewsTable;
