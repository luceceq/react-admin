import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import IconDelete from '@material-ui/icons/Delete';
import IconCloudDownload from '@material-ui/icons/CloudDownload';
import CircularProgress from '@material-ui/core/CircularProgress';
import ConfirmDialog from "../Commons/ConfirmDialog";

import { deleteFirmwareRequest } from "../../Actions/firmware";

const styles = theme => ({
  modalPaper: {
    maxHeight: 300,
    overflow: 'auto',
  },
  modalTitle: {
    paddingBottom: 0,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class TableRowC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  deleteItem = id => {
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
    const { classes } = this.props;

    return (
      <React.Fragment>
        <TableRow key={this.props.firmware.id}>
          <TableCell component="th" scope="row">
            {this.props.firmware.filename}
          </TableCell>
          <TableCell numeric>
            <Button
              size="small"
              href={this.props.firmware.public_url}
            >
              <IconCloudDownload className={classNames(classes.leftIcon, classes.iconSmall)} />
              Download
            </Button>

            <ConfirmDialog
              callback={() => this.deleteItem(this.props.firmware.id)}
              render={(openModal) => (
                <Button
                  size="small"
                  disabled={this.state.isLoading}
                  onClick={openModal}
                >
                  {this.state.isLoading
                    ? <CircularProgress className={classNames(classes.leftIcon, classes.iconSmall)} size={22} />
                    : <IconDelete className={classNames(classes.leftIcon, classes.iconSmall)} />
                  }{' '}Delete
                </Button>
              )}
            />
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

TableRowC.propTypes = {
  classes: PropTypes.object.isRequired,
  firmware: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteRequest: (id) => deleteFirmwareRequest(id),
    },
    dispatch,
  );

const TableRowCWithStyle = withStyles(styles)(TableRowC);

export default connect(mapStateToProps, mapDispatchToProps)(TableRowCWithStyle);
