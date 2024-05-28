import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
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
import IconButton from 'components/@extended/IconButton';
// assets
// Redux
// import useAxios from 'utils/useAxios';
// import { useSelector, useDispatch } from 'react-redux';
// import { getUpdates } from 'redux/updateSlice/updateHandle';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
// project imports
import ProfileModal from 'pages/usersProfileView/profileView';
import { header } from './basic';
import MainCard from 'components/MainCard';
import { CSVExport, RowSelection } from 'components/third-party/react-table';
function createData(id, title, posted, dated, status) {
  return {
    id,
    title,
    posted,
    dated,
    status
  };
}

const rows = [
  createData(1, 'Fusce porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 1),
  createData(2, 'Fusce porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 3),
  createData(3, 'Fusce porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 1),
  createData(4, 'Fusce porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 1),
  createData(5, 'Fusce porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 2),
  createData(6, 'Fusce porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 3),
  createData(8, 'dssFusce porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 1),
  createData(9, 'Fusce porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 3),
  createData(10, 'Fusce porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 1),
  createData(11, 'Fusce porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 3),
  createData(12, 'Fusce porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 2),
  createData(13, 'dfsfsde porta velit arcu vitae dignissim nisl consectetur ve', 'Mohammed Ahmed ', '20/04/2024', 1)
];

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
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title'
  },
  {
    id: 'posted',
    numeric: false,
    disablePadding: false,
    label: 'Posted By'
  },
  {
    id: 'dated',
    numeric: false,
    disablePadding: false,
    label: 'Date Posted'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status'
  },

  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions'
  }
];

// ==============================|| MUI TABLE - HEADER ||============================== //

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
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

export default function UpdatesTable() {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileModalOpen = () => setProfileOpen(true);
  const profileModalClose = () => setProfileOpen(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedValue, setSelectedValue] = React.useState([]);
  // Fetch Data
  // Fetch upDates Data
  // const dispatch = useDispatch();
  // const axiosInstance = useAxios();
  // const [updatesData, setUpdatesData] = useState([]);
  // const { updatesList } = useSelector((state) => state.updates);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await axiosInstance.get('/admin/events/').then((res) => {
  //         setUpdatesData(res.data);
  //       });
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // useEffect(() => {
  //   dispatch(getUpdates(updatesData));
  // }, [updatesData, dispatch]);
  // useEffect(() => {
  //   console.log('Update Datas===========>', updatesData);
  // }, [updatesData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = rows.map((n) => n.id);
      setSelected(newSelectedId);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   // const selectedRowData = rows.filter((row) => newSelected.includes(row.group.toString()));
  //   // setSelectedValue(selectedRowData);
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <MainCard
        content={false}
        title="Community Updates"
        secondary={
          <CSVExport data={selectedValue.length > 0 ? selectedValue : rows} headers={header} filename={'selected-table-data.csv'} />
        }
      >
        <RowSelection selected={selected.length} />
        {/* table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  /** make sure no display bugs if row isn't an OrderData object */
                  if (typeof row === 'number') return null;
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      key={index}
                      hover
                      // onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="left" sx={{ width: '10px' }}>
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.posted}</TableCell>
                      <TableCell align="left">{row.dated}</TableCell>
                      <TableCell align="left" sx={{ maxWidth: '100px' }}>
                        {row.status === 1 && (
                          <>
                            <Box sx={{ display: 'flex' }}>
                              <Typography
                                fontSize={12}
                                sx={{ color: '#52C41A', borderRadius: '5px', backgroundColor: '#F6FFED', padding: '5px' }}
                              >
                                Published
                              </Typography>
                            </Box>
                          </>
                        )}
                        {row.status === 2 && (
                          <>
                            <Box sx={{ display: 'flex' }}>
                              <Typography
                                fontSize={12}
                                sx={{ color: '#1890FF', borderRadius: '5px', backgroundColor: '#E6F7FF', padding: '5px' }}
                              >
                                Pending Review
                              </Typography>
                            </Box>
                          </>
                        )}
                        {row.status === 3 && (
                          <>
                            <Box sx={{ display: 'flex' }}>
                              <Typography
                                fontSize={12}
                                sx={{ color: '#FF4D4F', borderRadius: '5px', backgroundColor: '#FFF1F0', padding: '5px' }}
                              >
                                Canceled
                              </Typography>
                            </Box>
                          </>
                        )}
                      </TableCell>
                      <TableCell align="left" sx={{ maxWidth: '100px' }}>
                        <IconButton onClick={profileModalOpen}>
                          <CloseOutlined />
                        </IconButton>
                        <IconButton sx={{ color: '#FF4D4F' }}>
                          <CheckOutlined />
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
      {/* <ProfileModal modalOpen={profileOpen} modalClose={profileModalClose} /> */}
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
