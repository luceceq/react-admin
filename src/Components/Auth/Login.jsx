import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import './Auth.css';

const styles = theme => ({
  root: theme.mixins.gutters ({
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
  }),
  margin: {},
  textField: {
    width: 300,
  },
  button: {
    marginTop: theme.spacing.unit * 4,
  },
});

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  componentDidMount () {
    if (this.props.auth.user.signInUserSession) {
      this.props.changePage ('dashboard');
    } else {
      window.location = `${process.env.REACT_APP_LOGIN_URL}/login?response_type=token&client_id=${process.env.REACT_APP_LOGIN_CLIENT_ID}&redirect_uri=${window.location.origin}/`;
    }
  }

  onChangeInputField = (key, value) => {
    this.setState ({
      [key]: value,
    });
  };

  render () {
    const {classes} = this.props;

    return (
      <Grid
        container
        alignItems="center"
        direction="row"
        justify="center"
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object,
};

const mapDispatchToProps = {
  changePage: (path = null) => push (`/${path}`),
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const LoginWithStyle = withStyles (styles) (Login);

export default connect (mapStateToProps, mapDispatchToProps) (LoginWithStyle);
