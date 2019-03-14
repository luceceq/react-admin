import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { logOut } from "../../Actions/auth";

import './Auth.css';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  }),
  margin: {},
  textField: {
    width: 300,
  },
  button: {
    marginTop: theme.spacing.unit * 4
  },
});

class LogOut extends Component {
  state = {
    username: '',
    password: '',
  }

  componentDidMount() {
    this.props.logOut();
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        alignItems='center'
        direction='row'
        justify='center'
        className="auth"
      >
        <Grid item>
          <Paper className={classes.root}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              href={`${process.env.REACT_APP_LOGIN_URL}/login?response_type=token&client_id=${process.env.REACT_APP_LOGIN_CLIENT_ID}&redirect_uri=${window.location.origin}/`}
            >
              Authenticate
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

LogOut.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  logOut,
}

const LogOutWithStyle = withStyles(styles)(LogOut);

export default connect(
  null, // we don’t need to states.
  mapDispatchToProps,
)(LogOutWithStyle);
