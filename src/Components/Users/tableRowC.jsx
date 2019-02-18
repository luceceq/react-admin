import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = theme => ({});

class TableRowC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  deleteGroupHardware = id => {
    this.setState({
      isLoading: true,
    });

    this.props.deleteRequest(id).catch(e => {
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <TableRow key={this.props.user.id}>
          <TableCell>
            {this.props.user.id}
          </TableCell>
          <TableCell component="th" scope="row">
            {this.props.user.cognito_user_id}
          </TableCell>
          <TableCell numeric>
            {this.props.user.group_id}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

TableRowC.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch,
  );

const TableRowCWithStyle = withStyles(styles)(TableRowC);

export default connect(mapStateToProps, mapDispatchToProps)(TableRowCWithStyle);
