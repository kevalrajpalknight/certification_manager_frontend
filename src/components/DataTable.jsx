import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Box,
  Typography,
  Pagination,
} from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

import axios from "axios";
import baseURL from "./config";
import { useTheme } from "@emotion/react";

const DataTable = () => {
  const theme = useTheme();
  const itemPerPage = 10;
  const ascendingSortClass = {
    display: "inline-block",
    transform: "rotate(0deg)",
    transition: "transform 0.2s",
  };

  const descendingSortClass = {
    display: "inline-block",
    transform: "rotate(180deg)",
    transition: "transform 0.2s",
  };

  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage] = useState(itemPerPage); // Number of rows per page

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSort = (column) => {
    // Check if we are already sorting by this column
    if (sortedColumn === column) {
      setSortedColumn(column);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    } else {
      // Set the sorted data and the current sorted column
      setSortedColumn(column);
      setSortOrder("asc"); // Default to ascending order
    }
  };

  const fetchData = async (search, sortedColumn, page, rowsPerPage) => {
    try {
      const url = baseURL + "user/";
      let requestedPage = page === 0 ? 1 : page;
      const response = await axios.get(url, {
        params: {
          search,
          ordering: setSortOrder === "asc" ? "" : "-" + sortedColumn,
          page: requestedPage,
          page_size: rowsPerPage,
          format: "json",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    async function fetchDataAndSetData() {
      try {
        const result = await fetchData(
          filterText,
          sortedColumn,
          page,
          rowsPerPage
        );
        setData(result.results);
        setTotalRows(result.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataAndSetData();
  }, [filterText, sortedColumn, totalRows, page, rowsPerPage]);

  return (
    <Box marginTop={2}>
      <TextField
        label="Filter"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        fullWidth
        sx={{
          marginBottom: 3,
        }}
      />
      <TableContainer component={Paper} elevation={12}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: theme.palette.primary.dark,
            }}
          >
            <TableRow>
              <TableCell
                onClick={() => handleSort("name")}
                sx={{
                  color: "white",
                }}
              >
                Name{" "}
                {sortedColumn === "name" && (
                  <span
                    style={
                      sortedColumn === "name"
                        ? sortOrder === "asc"
                          ? ascendingSortClass
                          : descendingSortClass
                        : {}
                    }
                  >
                    <ArrowUpward />
                  </span>
                )}
              </TableCell>
              <TableCell
                onClick={() => handleSort("email")}
                sx={{
                  color: "white",
                }}
              >
                Email{" "}
                {sortedColumn === "email" && (
                  <span
                    style={
                      sortedColumn === "email"
                        ? sortOrder === "asc"
                          ? ascendingSortClass
                          : descendingSortClass
                        : {}
                    }
                  >
                    <ArrowUpward />
                  </span>
                )}
              </TableCell>
              <TableCell
                onClick={() => handleSort("phone")}
                sx={{
                  color: "white",
                }}
              >
                Phone{" "}
                {sortedColumn === "phone" && (
                  <span
                    style={
                      sortedColumn === "phone"
                        ? sortOrder === "asc"
                          ? ascendingSortClass
                          : descendingSortClass
                        : {}
                    }
                  >
                    <ArrowUpward />
                  </span>
                )}
              </TableCell>
              <TableCell
                onClick={() => handleSort("address")}
                sx={{
                  color: "white",
                }}
              >
                Address{" "}
                {sortedColumn === "address" && (
                  <span
                    style={
                      sortedColumn === "address"
                        ? sortOrder === "asc"
                          ? ascendingSortClass
                          : descendingSortClass
                        : {}
                    }
                  >
                    <ArrowUpward />
                  </span>
                )}
              </TableCell>
              <TableCell
                onClick={() => handleSort("city")}
                sx={{
                  color: "white",
                }}
              >
                City{" "}
                {sortedColumn === "city" && (
                  <span
                    style={
                      sortedColumn === "city"
                        ? sortOrder === "asc"
                          ? ascendingSortClass
                          : descendingSortClass
                        : {}
                    }
                  >
                    <ArrowUpward />
                  </span>
                )}
              </TableCell>
              <TableCell
                onClick={() => handleSort("numCertifications")}
                sx={{
                  color: "white",
                }}
              >
                Number of Certification{" "}
                {sortedColumn === "numCertifications" && (
                  <span
                    style={
                      sortedColumn === "numCertifications"
                        ? sortOrder === "asc"
                          ? ascendingSortClass
                          : descendingSortClass
                        : {}
                    }
                  >
                    <ArrowUpward />
                  </span>
                )}
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                }}
              >
                List of Certificates
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                }}
              >
                Profession
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    ":hover": {
                      backgroundColor: index % 2 === 0 ? theme.palette.primary.hover : theme.palette.secondary.hover,
                    },
                    backgroundColor: index % 2 === 0 ? theme.palette.primary.light : theme.palette.secondary.light,
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    {row.address ? row.address.local_address : ""}
                  </TableCell>
                  <TableCell>{row.address ? row.address.city : ""}</TableCell>
                  <TableCell>{row.certifications.length}</TableCell>
                  <TableCell rowSpan={row.certifications.length}>
                    {row.certifications
                      .map((cert) => cert.certificate_name)
                      .join(", ")}
                  </TableCell>
                  <TableCell>{row.profession[0]?.profession}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} sx={{backgroundColor: theme.palette.secondary.light}}>
                  <Typography variant="h6" align="center">
                    No Records Available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        flex={3}
        p={1}
        display={"flex"}
        justifyContent={"center"}
        marginTop={1}
      >
        <Pagination
          count={Math.floor(totalRows / itemPerPage)}
          page={page}
          color="primary"
          defaultPage={1}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default DataTable;
