import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button, TextField, Pagination } from "@mui/material";

import ListEventTable from "../dashboards/dashboard1-components/EventTable";

const EventTable = () => {
  const [EventData, setEventData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      fetchEventData(page,search);
    }, 500);
    return () => clearTimeout(delayTimeout); // Cleanup the timeout on unmount or when search changes
  }, [page, search]);

  const fetchEventData = async (p,s) => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/events?page=${p}&search=${s}`);
      const data = await response.json();
      setEventData(data['data']);
      setTotalPage(data['totalPages']);
    } catch (error) {
      console.error("Error fetching Event data:", error);
    }
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
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
              <Typography variant="h3">Data Event</Typography>
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
              <ListEventTable events={EventData} />
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

export default EventTable;
