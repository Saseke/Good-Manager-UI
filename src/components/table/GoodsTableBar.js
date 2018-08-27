import React from 'react';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Typography from '@material-ui/core/Typography/Typography';
import * as PropTypes from 'prop-types';
import {lighten} from '@material-ui/core/es/styles/colorManipulator';
import withStyles from '@material-ui/core/es/styles/withStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import classNames from 'classnames';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class GoodsTableBar extends React.Component {

  render() {

    const {classes, numSelected} = this.props;
    return (
      <div>
        <Toolbar
          className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          <div className={classes.title}>
            {numSelected > 0 ? (
              <Typography color="inherit" variant="subheading">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography variant="title" id="tableTitle">
                Nutrition
              </Typography>
            )}
          </div>
          <div className={classes.spacer}/>
          <div className={classes.actions}>
            {numSelected > 0 ? (
              <Tooltip title="Delete">
                <IconButton aria-label="Delete">
                  <DeleteIcon/>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Filter list">
                <IconButton aria-label="Filter list">
                  <FilterListIcon/>
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Toolbar>
      </div>
    );
  }
}

GoodsTableBar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};
export default GoodsTableBar = withStyles(toolbarStyles)(GoodsTableBar);