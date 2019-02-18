import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconCloudUpload from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';

import { addFirmwareRequest } from "../../Actions/firmware";
import { getBase64 } from '../../Helpers/base64Helper';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  textField: {
    minWidth: 250,
  },
  browseInputFile: {
    display: 'none',
  }
});

class AddNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  handleAddNew = (data) => {
    this.setState({
      isLoading: true,
    });

    this.props.addRequest(data).then(r => {
      if (r) {
        this.setState({
          isLoading: false,
        });

        toast.success('Successfully uploaded.');
      } else {
        this.setState({
          isLoading: false,
        });
      }
    });
  }

  fileSelected = (el) => {
    const file = el.target.files[0];

    getBase64(file).then(r => {
      this.handleAddNew({
        filename: file.name,
        content: r,
      });
    }).catch(e => {
      toast.error('Something went wrong, try again.')
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <input
          className={classes.browseInputFile}
          id="flat-button-file"
          type="file"
          disabled={this.state.isLoading}
          onChange={this.fileSelected}
        />
        <label htmlFor="flat-button-file">
          <Button
            component="span"
            size="small"
            disabled={this.state.isLoading}
          >
            {this.state.isLoading
              ? <CircularProgress className={classNames(classes.leftIcon, classes.iconSmall)} size={22} />
              : <IconCloudUpload className={classNames(classes.leftIcon, classes.iconSmall)} />
            }
            Add new firmware
          </Button>
        </label>
      </React.Fragment>
    );
  }
}

AddNew.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.array,
};

const mapStateToProps = state => ({
  errors: state.firmware.addError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addRequest: (data) => addFirmwareRequest(data),
    },
    dispatch,
  );

const AddNewWithStyle = withStyles(styles)(AddNew);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewWithStyle);
