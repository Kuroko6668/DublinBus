import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import TableHead from '@mui/material/TableHead';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import { InfoWindow, Marker, useGoogleMap } from "@react-google-maps/api";
import {Button, Input, Typography, Card, CardActions, CardContent, Box} from '@mui/material';
import React,{Component, useRef, useState} from 'react'




function TablePaginationActions(props) {
  const mapRef = useGoogleMap();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
           <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
           <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          <LastPageIcon /> 
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const ArrivalsTable = (props)=>{


    const {arrivals} = props
    console.log(arrivals);
    const rows = arrivals
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 4
    console.log(rows);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    return <Card sx={{ maxWidth: 1000 }} variant="outlined">
            <Table sx={{ minWidth:300 }} aria-label="custom pagination table">
            <TableHead>
            <TableRow>
                <TableCell
                  key={'gsafasf'}
                  align={'center'}
                >
                  {"Name"}
                </TableCell>
                <TableCell
                  key={'asdfsadfdsa'}
                  align={'center'}
                >
                  {"Destination"}
                </TableCell>
                <TableCell
                  key={'asdffdsa'}
                  align={'center'}
                >
                  {"Time"}
                </TableCell>
            </TableRow>
          </TableHead>
                <TableBody>
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                ).map((row) => (
                    <TableRow key={Math.random().toString()}>
                    <TableCell style={{ width: 30 }} align="center">
                        {row.line}
                    </TableCell>
                    <TableCell style={{ width: 30 }} align="center">
                        {row.trip_headsign.split(' - ')[1]}
                    </TableCell>
                    <TableCell style={{ width: 30 }} align="center">
                        {row.due_in_min + ' mins'}
                    </TableCell>
                    </TableRow>
                ))}

                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TablePagination
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={4}
                    page={page}
                    rowsPerPageOptions={[]}
                    SelectProps={{
                        inputProps: {
                        'aria-label': 'rows per page',
                        },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
                </TableFooter>
            </Table>
            </Card>
  }
export default ArrivalsTable;