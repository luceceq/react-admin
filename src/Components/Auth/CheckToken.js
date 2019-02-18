import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { logOutAction } from '../../Actions/auth';

export default function withCheckToken(WrappedComponent) {
  class withCheckTokenClass extends Component {
    constructor(props) {
      super(props);

      this.state = {
        intervalId: null,
      };
    }

    componentDidMount() {
      let intervalId = setInterval(() => {
        this.checkToken();
      }, 5000);

      this.setState({
        intervalId,
      }, () => {
        this.checkToken();
      });
    }

    componentWillUnmount() {
      clearInterval(this.state.intervalId);
    }

    checkToken() {
      try {
        let { user: { signInUserSession: { accessToken } } } = this.props.auth;

        if (parseInt((new Date()).getTime() / 1000, 10) > accessToken.payload.exp) {
          throw new Error("Your token has expired.");
        }
      } catch (error) {
        this.props.logOutAction();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  withCheckTokenClass.propTypes = {
    auth: PropTypes.object,
  };

  const mapStateToProps = state => ({
    auth: state.auth,
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        logOutAction,
      },
      dispatch,
    );

  return connect(mapStateToProps, mapDispatchToProps)(withCheckTokenClass);
}
