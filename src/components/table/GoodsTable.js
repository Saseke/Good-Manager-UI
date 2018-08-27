import {withStyles} from '@material-ui/core/styles';
import * as React from 'react';
import {tableData} from '../../data/mockTableData';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import PropTypes from 'prop-types';
import GoodsTableBar from './GoodsTableBar';
import GoodTableHead from './GoodTableHead';

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

class GoodsTable extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: tableData,
    };
  }

  render() {
    const {classes} = this.props;
    const {data} = this.state;
    return (
      <Paper className={classes.root}>
        <GoodsTableBar numSelected={0}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='tableTitle'>
            <GoodTableHead/>
            <TableBody>
              {data
                .map(n => {
                  return (
                    <TableRow>
                      <TableCell padding='checkbox'>
                      </TableCell>
                      <TableCell component='th' scope='row' padding='none'>
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.calories}</TableCell>
                      <TableCell numeric>{n.fat}</TableCell>
                      <TableCell numeric>{n.carbs}</TableCell>
                      <TableCell numeric>{n.protein}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(GoodsTable);
