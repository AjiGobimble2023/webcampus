import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@mui/material";

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
const TopicDiscussionTable = ({topics}) => {
  const handleEditClick = (topicId) => {
    console.log(`Edit clicked for topic with ID: ${topicId}`);
  };

  const handleDeleteClick = (topicId) => {
    console.log(`Delete clicked for topic with ID: ${topicId}`);
  };
  if (topics.length === 0 || topics == null || !topics) {
    return (
      <TableHead>
        <TableRow>
          <TableCell >
            <Typography>Data Kosong</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  } else {
    return (
      <Box
        sx={{
           wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal', 
          overflowX: "auto",
          maxWidth: "100%", 
        }}
      >
    <Table
    aria-label="simple table"
    sx={{
       wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
      mt: 3,
      whiteSpace: "nowrap",
    }}
  >
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            No
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            judul
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            deskripsi
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography color="textSecondary" variant="h6">
            image
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography color="textSecondary" variant="h6">
            pembuat
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography color="textSecondary" variant="h6">
            tanggal
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography color="textSecondary" variant="h6">
            aksi
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {topics.map((topic,index) => (
        <TableRow key={topic.title}>
          <TableCell>
            <Typography
              sx={{
                 wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
             {index + 1}
            </Typography>
          </TableCell>
          <TableCell>
            <Box
              sx={{
                 wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                     wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
                    fontWeight: "600",
                  }}
                >
                  {topic.title}
                </Typography>
               
              </Box>
            </Box>
          </TableCell>
          <TableCell>
           <Typography
                  variant="p"
                  sx={{
                     wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
                    fontWeight: "400",
                  }}
                >
                  {topic.content}
                </Typography>
            </TableCell>
          <TableCell>
            <img
              src={topic.image_url}
              alt={topic.title} 
              style={{ maxWidth: '100px', maxHeight: '100px' }} 
            />
          </TableCell>

          <TableCell>
          <Typography
                  variant="h6"
                  sx={{
                     wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
                    fontWeight: "600",
                  }}
                >
                  {topic.author['full_name']}
                </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="h6">
              {new Date(topic.createdAt).getDate()} {months[new Date(topic.createdAt).getMonth()]} {new Date(topic.createdAt).getFullYear()}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditClick(topic.id)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteClick(topic.id)}
              sx={{
                 wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal', ml: 2 }}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  </Box>
    );
  }
};

export default TopicDiscussionTable;
