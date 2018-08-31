import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import GoodsTableBar from './table/GoodsTableBar';
import GoodsTableHead from './table/GoodsTableHead';
import {getAllItems} from '../util/APIUtil';
import Button from '@material-ui/core/Button/Button';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const rows = [
  {id: 'id', numeric: false, disablePadding: false, label: 'Id'},
  {id: 'title', numeric: false, disablePadding: false, label: '名称'},
  {id: 'price', numeric: true, disablePadding: false, label: '价格'},
  {id: 'num', numeric: true, disablePadding: false, label: '数量'},
  {id: 'limitNum', numeric: true, disablePadding: false, label: '限售数量'},
  {id: 'operation', numeric: false, disablePadding: false, label: '操作'},
];

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'price',
    selected: [],
    data: null,
    page: 0,
    rowsPerPage: 5,
  };

  componentDidMount() {
    getAllItems().then(response => {
      console.log(response);
      this.setState({
        data: response.data.allItem
      });
    });
  }

  handleRequestSort = (event, property) => {
    console.log("aler");
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({order, orderBy});
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({selected: state.data.map(n => n.id)}));
      return;
    }
    this.setState({selected: []});
  };

  handleClick = (event, id) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({selected: newSelected});
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const {classes} = this.props;
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
    if (data == null) {
      return null;
    }
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <GoodsTableBar
          barTitle="商品列表"
          numSelected={selected.length}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <GoodsTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              rows={rows}/>
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected}/>
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.id}
                      </TableCell>
                      <TableCell>{n.title}</TableCell>
                      <TableCell numeric>{n.price}</TableCell>
                      <TableCell numeric>{n.num}</TableCell>
                      <TableCell numeric>{n.limitNum}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="secondary" className={classes.button}>
                          下架
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button}>
                          修改
                        </Button>
                        <Button variant="contained" color="" className={classes.button}>
                          删除
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{height: 49 * emptyRows}}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
