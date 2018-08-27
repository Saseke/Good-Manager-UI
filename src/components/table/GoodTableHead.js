import * as React from 'react';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

const rows = [
  {id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)'},
  {id: 'calories', numeric: true, disablePadding: false, label: 'Calories'},
  {id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)'},
  {id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)'},
  {id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)'},
];


class GoodTableHead extends React.Component {
  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell padding='checkbox'>
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default GoodTableHead;
