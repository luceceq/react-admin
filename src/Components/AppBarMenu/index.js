import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

import {logOutAction} from '../../Actions/auth';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
  },
  flex: {
    flex: 1,
  },
  spanClickable: {
    cursor: 'pointer',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class AppBarMenu extends Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState ({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState ({anchorEl: null});
  };

  handleLogout = () => {
    this.props.dispatchLogout ();
    this.handleClose ();
  };

  goToDashboard = () => {
    this.props.changePage ('dashboard');
  };

  render () {
    const {classes, auth} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean (anchorEl);

    return (
      <AppBar className={classes.appBar}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              <span
                className={classes.spanClickable}
                onClick={this.goToDashboard}
              >
                Admin Dashboard
              </span>
            </Typography>

            {auth.user.signInUserSession &&
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="false"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>}
          </Toolbar>
        </AppBar>
      </AppBar>
    );
  }
}

AppBarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object,
};

AppBarMenu.defaultProps = {
  auth: {},
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      changePage: (path = null) => push (`/${path}`),
      dispatchLogout: () => logOutAction (),
    },
    dispatch
  );

const AppBarMenuWithStyle = withStyles (styles) (AppBarMenu);

export default connect (mapStateToProps, mapDispatchToProps) (
  AppBarMenuWithStyle
);
