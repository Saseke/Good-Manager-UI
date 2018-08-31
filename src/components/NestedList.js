import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import FolderIcon from '@material-ui/icons/Folder';
import ItemIcon from '@material-ui/icons/LocalMallOutlined';
import CategoryIcon from '@material-ui/icons/CategoryOutlined';
import Link from 'react-router-dom/es/Link';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {
  state = {
    // open: false,
    itemFolder: false,
    orderFolder: false
  };

  handleItemFolderClick = () => {
    this.setState(state => ({itemFolder: !state.itemFolder}));
  };
  handleOrderFolderClick = () => {
    this.setState(state => ({orderFolder: !state.orderFolder}));
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
        >
          <ListItem button onClick={this.handleItemFolderClick}>
            <ListItemIcon>
              <ItemIcon/>
            </ListItemIcon>
            <ListItemText inset primary="商品管理"/>
            {this.state.itemFolder ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse in={this.state.itemFolder} timeout="auto" unmountOnExit>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder/>
              </ListItemIcon>
              <Link to='/itemList'><ListItemText inset primary="商品列表"/></Link>
            </ListItem>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <CategoryIcon/>
                </ListItemIcon>
                <ListItemText inset primary="分类管理"/>
              </ListItem>

            </List>
          </Collapse>
        </List>

        <List
          component="nav"
        >
          <ListItem button onClick={this.handleOrderFolderClick}>
            <ListItemIcon>
              <FolderIcon/>
            </ListItemIcon>
            <ListItemText inset primary="订单管理"/>
            {this.state.orderFolder ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse in={this.state.orderFolder} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder/>
                </ListItemIcon>
                <ListItemText inset primary="订单列表"/>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);