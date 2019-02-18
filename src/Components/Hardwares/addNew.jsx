import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { withStyles } from '@material-ui/core/styles';

import IconAdd from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Slide from '@material-ui/core/Slide';

import { addHardwareRequest } from "../../Actions/hardwares";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  textField: {
    minWidth: 250,
  },
});

class AddNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: '',
      isLoading: false,
      dialogShowingStatus: false,
      selectBoxCurrent: 0,
    };
  }

  handleModalOpen = () => {
    this.setState({
      dialogShowingStatus: true,
    })
  }

  handleModalClose = () => {
    this.setState({
      dialogShowingStatus: false,
    })
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value.trim(),
    })
  }

  handleAddNew = () => {
    this.setState({
      isLoading: true,
    });

    this.props.addRequest({
      name: this.state.inputText
    }).then(e => {
      if (e) {
        this.setState({
          isLoading: false,
          inputText: '',
        });

        toast.success('Successfully added.');
        this.handleModalClose();
      } else {
        this.setState({
          isLoading: false,
        });
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Button
          component="span"
          size="small"
          onClick={this.handleModalOpen}
        >
          <IconAdd className={classes.leftIcon} /> Add new hardware
        </Button>

        <Dialog
          open={this.state.dialogShowingStatus}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleModalClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Add a new hardware"}
          </DialogTitle>

          <DialogContent>
            <TextField
              id="name"
              label="Device Name"
              margin="normal"
              className={classes.textField}
              value={this.state.inputText}
              onChange={this.handleChange}
              disabled={this.state.isLoading}
              error={!!this.props.errors.length}
              helperText={this.props.errors.join(",")}
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button disabled={this.state.isLoading} onClick={this.handleModalClose} color="primary">Cancel</Button>
            <Button disabled={this.state.isLoading} onClick={this.handleAddNew} color="primary">Add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

AddNew.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.array,
};

const mapStateToProps = state => ({
  errors: state.hardwares.addError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addRequest: (data) => addHardwareRequest(data),
    },
    dispatch,
  );

const AddNewWithStyle = withStyles(styles)(AddNew);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewWithStyle);
