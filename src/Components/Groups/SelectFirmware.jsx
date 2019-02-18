import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconDelete from '@material-ui/icons/Delete';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import { addFirmwareAssignment, deleteFirmwareAssignment } from "../../Actions/firmwareAssignments";

const styles = theme => ({
  selectBox: {
    marginRight: theme.spacing.unit,
    width: 200,
  },
  leftIcon: {},
  button: {
    minWidth: 32,
  },
  progress: {
    display: 'block',
    margin: 0,
    marginRight: theme.spacing.unit * 2,
  },
});

class SelectFirmware extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      assignmentId: 0,
      selectBoxCurrent: 0,
    };
  }

  componentDidMount() {
    this.updateAssignment();
  }

  updateAssignment() {
    let filteredList = this.props.firmwareAssignmentsList
      .filter(item => item.group_id === this.props.groupId)
      .filter(item => item.hardware_id === this.props.hardwareId);

    if (filteredList[0]) {
      this.setState({
        assignmentId: filteredList[0].id,
        selectBoxCurrent: filteredList[0].firmware_id,
      });
    }
  }

  handleSelectBoxChange = el => {
    let valueId = el.target.value;

    if (valueId === 0) {
      return this.handleDeleteAssignment();
    }

    this.setState({
      isLoading: true,
    });

    this.props.addFirmwareAssignment({
      group_id: this.props.groupId,
      hardware_id: this.props.hardwareId,
      firmware_id: valueId,
    }).then(r => {
      this.setState({
        selectBoxCurrent: valueId,
        isLoading: false,
      }, () => {
        this.updateAssignment();
      });
    }).catch(e => {
      this.setState({
        isLoading: false,
      });
    });
  }

  handleDeleteAssignment = () => {
    this.setState({
      isLoading: true,
    });

    this.props.deleteFirmwareAssignment(this.state.assignmentId).then(r => {
      this.setState({
        isLoading: false,
        assignmentId: 0,
        selectBoxCurrent: 0,
      });
    }).catch(e => {
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Fade in={this.state.isLoading}>
          <CircularProgress color="secondary" size={24} className={classes.progress} />
        </Fade>

        <Select
          className={classes.selectBox}
          disabled={this.state.isLoading}
          value={this.state.selectBoxCurrent}
          onChange={this.handleSelectBoxChange}
        >
          <MenuItem key={0} value={0}>Select firmware</MenuItem>
          {this.props.firmwareList.map(item => (
            <MenuItem key={item.id} value={item.id}>{item.filename}</MenuItem>
          ))}
        </Select>

        <Button
          size="small"
          disabled={this.state.isLoading || !this.state.selectBoxCurrent}
          onClick={this.handleDeleteAssignment}
          className={classes.button}
        >
          <IconDelete className={classNames(classes.leftIcon, classes.iconSmall)} />
        </Button>
      </React.Fragment>
    );
  }
}

SelectFirmware.propTypes = {
  classes: PropTypes.object.isRequired,
  groupId: PropTypes.number.isRequired,
  hardwareId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  firmwareList: state.firmware.list,
  firmwareAssignmentsList: state.firmwareAssignments.list,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addFirmwareAssignment,
      deleteFirmwareAssignment,
    },
    dispatch,
  );

const SelectFirmwareWithStyle = withStyles(styles)(SelectFirmware);

export default connect(mapStateToProps, mapDispatchToProps)(SelectFirmwareWithStyle);
