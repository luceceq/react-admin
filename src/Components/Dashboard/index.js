import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Route, Switch } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import withCheckToken from "../Auth/CheckToken";
import AppBarMenu from "../AppBarMenu";
import Navigation from "../Navigation";
import Groups from "../Groups";
import Firmware from "../Firmware";
import Users from "../Users";
import Hardwares from "../Hardwares";
import DeleteItem from "../DeleteItem";
import ItemLookup from "../ItemLookup";

import { getParameter } from "../../Helpers/urlHelper";
import { hardLogin } from "../../Actions/auth";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    marginLeft: 280,
  },
  toolbar: theme.mixins.toolbar,
});

class Dashboard extends Component {
  componentDidMount() {
    let url = window.location.toString().replace('#', '?');
    let token = getParameter('access_token', url);
    let expire = getParameter('expires_in', url);

    if (token) {
      this.props.login({
        token,
        expire,
      });
    } else {
      if (!this.props.auth.user.signInUserSession) {
        this.props.changePage('login');
      }
    }
  }

  redirectToHome = () => {
    setTimeout(() => {
      this.props.changePage('dashboard/item-lookup');
    }, 100);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBarMenu />

        <Navigation />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path="/dashboard" render={() => (
              <div>
                <Typography noWrap>Please wait...</Typography>
                {this.redirectToHome()}
              </div>
            )} />
            <Route path="/dashboard/groups" component={Groups} />
            <Route path="/dashboard/firmware" component={Firmware} />
            <Route path="/dashboard/users" component={Users} />
            <Route path="/dashboard/hardwares" component={Hardwares} />
            <Route path="/dashboard/account-reset" component={DeleteItem} />
            <Route path="/dashboard/item-lookup" component={ItemLookup} />
            <Route render={() => (
              <div>Page not found.</div>
            )} />
          </Switch>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: (path = null) => push(`/${path}`),
      login: user => hardLogin(user),
    },
    dispatch,
  );

let DashboardWithStyle = withStyles(styles)(Dashboard);
DashboardWithStyle = connect(mapStateToProps, mapDispatchToProps)(DashboardWithStyle);
DashboardWithStyle = withCheckToken(DashboardWithStyle);

export default DashboardWithStyle;
