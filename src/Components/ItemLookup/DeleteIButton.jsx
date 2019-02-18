import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';

import { requestDeleteHardware } from "../../Actions/itemLookup";

const styles = theme => ({
  progress: {
    display: 'block',
    margin: 0,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});

class DeleteButton extends PureComponent {
  handleDelete = () => {
    this.props.requestDeleteHardware(this.props.id).then(r => {
      toast.success("Item successfully deleted.");
      this.props.onDelete(true);
    }).catch(e => {
      this.props.onDelete(false);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Button
        variant="outlined"
        color="secondary"
        disabled={this.props.itemLookup.isLoading}
        onClick={this.handleDelete}
      >
        {this.props.itemLookup.isLoading
          ? <CircularProgress size={22} className={classes.progress} />
          : 'Delete'
        }
      </Button>
    );
  }
}

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

const mapStateToProps = state => ({
  itemLookup: state.itemLookup,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestDeleteHardware,
    },
    dispatch,
  );

const DeleteButtonWithStyle = withStyles(styles)(DeleteButton);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButtonWithStyle);
