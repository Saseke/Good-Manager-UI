import React from 'react';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Typography from '@material-ui/core/Typography/Typography';
import * as PropTypes from 'prop-types';
import {lighten} from '@material-ui/core/es/styles/colorManipulator';
import withStyles from '@material-ui/core/es/styles/withStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button/Button';

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
  button: {
    margin: theme.spacing.unit,
  },
});

class GoodsTableBar extends React.Component {

  render() {

    const {classes, numSelected, barTitle} = this.props;
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
                {barTitle}
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
              <Tooltip title="添加">
                <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                  <AddIcon/>
                </Button>
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
  numSelected: PropTypes.number.isRequired,
  barTitle: PropTypes.string.isRequired
};
export default GoodsTableBar = withStyles(toolbarStyles)(GoodsTableBar);