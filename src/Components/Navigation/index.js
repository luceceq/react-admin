import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
import RestoreIcon from '@material-ui/icons/Restore';
import SearchIcon from '@material-ui/icons/Search';
// import GroupIcon from '@material-ui/icons/Group';
// import PersonIcon from '@material-ui/icons/Person';
// import DeveloperMode from '@material-ui/icons/DeveloperMode';

const drawerWidth = 280;

const styles = theme => ({
  drawerPaper: {
    position: 'fixed',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon, & $secondary': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  secondary: {},
  icon: {},
});

class Navigation extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        {/* <List>
          <ListItem button className={classes.menuItem} onClick={() => this.props.changePage('groups')}>
            <ListItemIcon className={classes.icon}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Groups" />
          </ListItem>

          <ListItem button className={classes.menuItem} onClick={() => this.props.changePage('firmware')}>
            <ListItemIcon className={classes.icon}>
              <DeveloperMode />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Firmware" />
          </ListItem>

          <ListItem button className={classes.menuItem} onClick={() => this.props.changePage('hardwares')}>
            <ListItemIcon className={classes.icon}>
              <MemoryIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Hardwares" />
          </ListItem>

          <ListItem button className={classes.menuItem} onClick={() => this.props.changePage('users')}>
            <ListItemIcon className={classes.icon}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Users" />
          </ListItem>
        </List>

        <Divider /> */}

        <List>
          <ListItem button className={classes.menuItem} onClick={() => this.props.changePage('item-lookup')}>
            <ListItemIcon className={classes.icon}>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary, secondary: classes.secondary }} primary="Item Lookup" />
          </ListItem>
        </List>

        <List>
          <ListItem button className={classes.menuItem} onClick={() => this.props.changePage('account-reset')}>
            <ListItemIcon className={classes.icon}>
              <RestoreIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary, secondary: classes.secondary }} primary="Account Reset" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  router: state.router,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: (path = null) => push(`/dashboard/${path}`),
    },
    dispatch,
  );

const NavigationWithStyle = withStyles(styles)(Navigation);

export default connect(mapStateToProps, mapDispatchToProps)(NavigationWithStyle);
