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
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

import axios from "axios";
import baseURL from "./config";

const DataTable = () => {
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
  const [filterText, setFilterText] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column) => {
    // Check if we are already sorting by this column
    if (sortedColumn === column) {
      // Reverse the data order if already sorted by the same column
      const sortedData = [...data].reverse();
      setData(sortedData);
      setSortedColumn(column);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    } else {
      // Sort the data based on the selected column
      const sortedData = [...data].sort((a, b) => {
        if (a[column] < b[column]) {
          return -1;
        }
        if (a[column] > b[column]) {
          return 1;
        }
        return 0;
      });

      // Set the sorted data and the current sorted column
      setData(sortedData);
      setSortedColumn(column);
      setSortOrder("asc"); // Default to ascending order
    }
  };

  const fetchData = async (search, sortedColumn, page, rowsPerPage) => {
    console.log({ search, sortedColumn, page, rowsPerPage });
    try {
      const url = baseURL + "user/";
      const response = await axios.get(url, {
        params: {
          search,
          ordering: sortedColumn,
          page: page + 1,
          page_size: rowsPerPage,
          format: "json",
        },
      });
      return response.data.results;
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
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataAndSetData();
  }, [filterText, sortedColumn, page, rowsPerPage]);

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
              backgroundColor: "#6366f1",
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
                      backgroundColor: index % 2 === 0 ? "#c2c2c2" : "#9095eb",
                    },
                    backgroundColor: index % 2 === 0 ? "white" : "#d0d2fb",
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
                <TableCell colSpan={8}>
                  <Typography variant="h6" align="center">
                    No Records Available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length} // Total number of rows
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default DataTable;
