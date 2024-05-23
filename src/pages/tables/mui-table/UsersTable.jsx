import PropTypes from 'prop-types';
import React from 'react';
import { useState, useEffect } from 'react';
// material-ui
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import { Typography } from '@mui/material';
// Redux
import { useSelector } from 'react-redux';
import IconButton from 'components/@extended/IconButton';
// assets

import { PauseOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
// project imports
import ProfileModal from 'pages/usersProfileView/profileView';
import MainCard from 'components/MainCard';
// table filter
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// table header
const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID'
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'Users'
  },
  {
    id: 'phoneNumber',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number'
  },
  {
    id: 'community',
    numeric: false,
    disablePadding: false,
    label: 'Community'
  },
  {
    id: 'joinedDate',
    numeric: false,
    disablePadding: false,
    label: 'Joined'
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions'
  }
];

// ==============================|| MUI TABLE - HEADER ||============================== //
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.numeric ? 'left' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function UsersTable() {
  const { usersList } = useSelector((state) => state.users);
  useEffect(() => {
    console.log(usersList);
  }, [usersList]);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileModalOpen = () => setProfileOpen(true);
  const profileModalClose = () => setProfileOpen(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = usersList.map((n, index) => index);
      setSelected(newSelectedId);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  // avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  return (
    <>
      <MainCard content={false} title="All Users">
        {/* table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={usersList.length}
            />
            <TableBody>
              {stableSort(usersList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  /** make sure no display bugs if row isn't an OrderData object */
                  if (typeof row === 'number') return null;
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="left" sx={{ width: '10px' }}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="left" sx={{ width: { xs: '200px', md: '250px', lg: '300px' } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <img src={row.profileImageKey} alt="groupImage" style={{ width: '40px', borderRadius: '50px' }} />
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ marginLeft: '10px' }}>
                              {row.firstName}
                              {row.lastName}
                            </Typography>
                            <Typography sx={{ marginLeft: '10px' }}>{row.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">{'Community'}</TableCell>
                      <TableCell align="center">{formatDate(row.joinedDate)}</TableCell>
                      <TableCell align="center" sx={{ minWidth: '200px' }}>
                        <IconButton onClick={profileModalOpen}>
                          <EditOutlined />
                        </IconButton>
                        {row.action === 1 ? (
                          <IconButton sx={{ color: '#FAAD14' }}>
                            <PauseOutlined />
                          </IconButton>
                        ) : (
                          <IconButton sx={{ color: '#FAAD14' }}>
                            <PlayCircleOutlined />
                          </IconButton>
                        )}

                        <IconButton sx={{ color: '#FF4D4F' }}>
                          <DeleteOutlined />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow sx={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />

        {/* table data */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={usersList?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
      <ProfileModal modalOpen={profileOpen} modalClose={profileModalClose} />
    </>
  );
}

EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.any,
  order: PropTypes.any,
  orderBy: PropTypes.any,
  numSelected: PropTypes.any,
  rowCount: PropTypes.any,
  onRequestSort: PropTypes.any
};
