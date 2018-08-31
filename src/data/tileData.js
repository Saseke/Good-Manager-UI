import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutline';
import BarChartIcon from '@material-ui/icons/BarChart';
import AdminIcon from '@material-ui/icons/AccountCircle';
import SettingIcon from '@material-ui/icons/Settings';
import InboxIcon from '@material-ui/icons/Inbox';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import List from '@material-ui/core/List/List';
import withStyles from '@material-ui/core/es/styles/withStyles';
import * as PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse/Collapse';

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
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        >
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText inset primary="Drafts" />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Inbox" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
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






















export const goodsOptions = (
  <div>

    <ListItem button onClick={this.handleClick}>
      <ListItemIcon>
        <InboxIcon/>
      </ListItemIcon>
      <ListItemText inset primary="Inbox">

      </ListItemText>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ShoppingCartOutlined/>
      </ListItemIcon>
      <ListItemText primary="Items"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CategoryOutlinedIcon/>
      </ListItemIcon>
      <ListItemText primary="Category"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ListAltOutlinedIcon/>
      </ListItemIcon>
      <ListItemText primary="Order"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PersonOutlinedIcon/>
      </ListItemIcon>
      <ListItemText primary="Members"/>
    </ListItem>
  </div>
);

export const backstageManager = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon/>
      </ListItemIcon>
      <ListItemText primary="Statistics"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AdminIcon/>
      </ListItemIcon>
      <ListItemText primary="Administrator"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingIcon/>
      </ListItemIcon>
      <ListItemText primary="Setting"/>
    </ListItem>
  </div>
);