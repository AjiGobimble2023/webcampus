import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button, TextField, Pagination } from "@mui/material";

import ListUserTable from "../dashboards/dashboard1-components/UserTable";

const UserTable = () => {
  const [UserData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      fetchNewsData();
    }, 500);

    return () => clearTimeout(delayTimeout); 
  }, [page, search]);

  const fetchNewsData = async () => {
    try {
      const headers = {
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRmMTNmYWVlZGFkNjM5OWY4NDc5NjYiLCJmdWxsX25hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkyMzQxMzI1fQ.G8Y5c5sLWBSJFQBZlycygSFHktFGVbG7MuQ7Q78x-qE`
      };
      
      const response = await fetch(`http://127.0.0.1:3001/api/alluser?page=${page}&search=${search}`, {
        headers: headers
      });
      const data = await response.json();
      console.log(data);
      setUserData(data['data']);
      setTotalPage(data['totalPages']);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };
  const handleSearchChange = (User) => {
    setSearch(User.target.value);
    setPage(1);
  };
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
              <Typography variant="h3">Data User</Typography>
              <Button
                variant="outlined"
                color="primary"
              >
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
              <ListUserTable users={UserData} />
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
                onChange={(User, page) => setPage(page)}
                variant="outlined"
                color="primary"
              />
            </Box>
          </Card>
      </Box>
  );
};

export default UserTable;
