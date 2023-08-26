import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button, Pagination, TextField } from "@mui/material";

import ListTopicDiscussionTable from "../dashboards/dashboard1-components/TopicDIscussionTable.js";

const TopicDiscussionTable = () => {
  const [TopicData, setTopicData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      fetchNewsData();
    }, 500);

    return () => clearTimeout(delayTimeout); // Cleanup the timeout on unmount or when search changes
  }, [page, search]);

  const fetchNewsData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/discussionTopic?page=${page}&search=${search}`);
      const data = await response.json();
      setTopicData(data['data']);
      setTotalPage(data['totalPages']);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };
  const handleSearchChange = (Topic) => {
    setSearch(Topic.target.value);
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
              <Typography variant="h3">Data Topik Diskusi</Typography>
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
              <ListTopicDiscussionTable topics={TopicData} />
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

export default TopicDiscussionTable;
